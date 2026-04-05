from fastapi import FastAPI, Request
from pydantic import BaseModel
import requests
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import re
from typing import Dict, Any
from langchain.tools import tool
from langchain_classic.agents import AgentExecutor, create_react_agent
from langchain_classic import hub
from langchain_classic.memory import ConversationBufferMemory
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from langchain_core.prompts import PromptTemplate
import json



load_dotenv()

# API URLs
import os

ENV = os.getenv("ENV", "local")

BASE_NODE_URL = (
    "http://localhost:3000"
    if ENV == "local"
    else "https://timecapsule-upg3.onrender.com"
)

NODE_API_URL = f"{BASE_NODE_URL}/api/capsule/createCapsule"
GET_CAPSULE_URL = f"{BASE_NODE_URL}/api/capsule/getUserCapsule"

# LLM
llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    temperature=0.3,
    max_new_tokens=300,
)
llm = ChatHuggingFace(llm=llm)

extract_prompt = PromptTemplate.from_template("""
Extract message and delivery date.

Rules:
- Return ONLY JSON
- deliveryDateTime MUST be a STRING in ISO format
- Always wrap values in double quotes
- No explanation

Format:
{{
  "message": "",
  "deliveryDateTime": ""
}}

User: {input}
""")

extract_chain = extract_prompt | llm



def extract_json(text: str):
    try:
        # extract JSON block
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if not match:
            return None

        json_str = match.group()

        # fix common issues
        json_str = json_str.replace("'", '"')  # single → double quotes

        # add quotes around ISO datetime if missing
        json_str = re.sub(
            r'("deliveryDateTime":\s*)([0-9T:\-\.]+)',
            r'\1"\2"',
            json_str
        )

        return json.loads(json_str)

    except Exception:
        return None
# FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session memory and state
session_memories: Dict[str, ConversationBufferMemory] = {}
session_states: Dict[str, Dict[str, Any]] = {}






def get_memory(session_id: str):
    if session_id not in session_memories:
        session_memories[session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,
        )
    return session_memories[session_id]

def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip().lower())
def get_session_state(session_id: str) -> Dict[str, Any]:
    if session_id not in session_states:
        session_states[session_id] = {
            "active_request_key": "",
            "last_action": "",
            "last_action_request_key": "",
            "last_action_input": "",
            "last_create_input": "",
            "last_create_result": "",
        }
    return session_states[session_id]


class Input(BaseModel):
    message: str
    session_id: str

def extract_with_llm(text: str):
    response = extract_chain.invoke({"input": text})
    return extract_json(response.content)

def create_tools(request: Request, session_id: str):
    state = get_session_state(session_id)
    request_state = {"tool_executed": False}

    def guard_tool_execution(action_name: str, action_input: str) -> str | None:
        normalized_input = normalize_text(action_input)
        active_request_key = state.get("active_request_key", "")

        if request_state["tool_executed"]:
            return "Warning: tool execution already completed for this request."

        if (
            state.get("last_action") == action_name
            and state.get("last_action_request_key") == active_request_key
        ):
            return "Warning: repeated tool action blocked to prevent loops."

        state["last_action"] = action_name
        state["last_action_request_key"] = active_request_key
        state["last_action_input"] = normalized_input
        request_state["tool_executed"] = True
        return None

    @tool(return_direct=True)
    def create_capsule(user_input: str) -> str:
        """Create a capsule from natural language using LLM extraction."""

        guard_message = guard_tool_execution("create_capsule", user_input)
        if guard_message:
            return guard_message

        normalized_input = normalize_text(user_input)

        if state.get("last_create_input") == normalized_input:
            return state.get(
                "last_create_result",
                "Warning: duplicate create request blocked for safety.",
            )

        state["last_create_input"] = normalized_input

        try:
            # 🔥 LLM extraction
            extracted = extract_with_llm(user_input)

            if not extracted:
                return "❌ Could not understand your request"

            message = extracted.get("message")
            delivery_date_time = extracted.get("deliveryDateTime")

            if not message:
                return "❌ Message missing"

            if not delivery_date_time:
                return "❌ Please provide a delivery date"

            # 🔥 future validation
            from datetime import datetime, timezone

            try:
                parsed_date = datetime.fromisoformat(delivery_date_time)

                if parsed_date.tzinfo is None:
                    parsed_date = parsed_date.replace(tzinfo=timezone.utc)

                now = datetime.now(timezone.utc)

                if parsed_date <= now:
                    return "❌ Please provide a future date"

            except Exception:
                return "❌ Invalid date format"

            # 🔥 API call
            jwt_token = request.cookies.get("jwt")
            print("JWT:", jwt_token)
            headers = {
    "Content-Type": "application/json",
    "Cookie": f"jwt={jwt_token}" if jwt_token else ""
}

            res = requests.post(
            NODE_API_URL,
            json={
        "message": message,
        "deliveryDateTime": delivery_date_time,
        
    },
        headers=headers,
        timeout=10,
)

            if res.status_code == 201:
                success = f"Capsule created: '{message}'"
                state["last_create_result"] = success
                return success

            failed = f"Failed to create capsule: {res.text}"
            state["last_create_result"] = failed
            return failed

        except Exception as e:
            error_text = f"Error while creating capsule: {str(e)}"
            state["last_create_result"] = error_text
            return error_text

    @tool(return_direct=True)
    def count_capsules(dummy: str = "") -> str:
        """Get total number of capsules. Always call with empty input ""."""
        _ = dummy
        guard_message = guard_tool_execution("count_capsules", "")
        if guard_message:
            return guard_message

        try:
            res = requests.get(GET_CAPSULE_URL, cookies=request.cookies, timeout=10)
            if res.status_code == 200:
                capsules = res.json().get("userCapsules", [])
                return f"You have {len(capsules)} capsules"
            return "I could not fetch your capsule count right now."
        except Exception as e:
            return f"Error while counting capsules: {str(e)}"

    @tool
    def get_capsules(dummy: str = "") -> str:
        """Get all capsule delivery dates."""
        _ = dummy
        guard_message = guard_tool_execution("get_capsules", "")
        if guard_message:
            return guard_message

        try:
            res = requests.get(GET_CAPSULE_URL, cookies=request.cookies, timeout=10)
            if res.status_code == 200:
                capsules = res.json().get("userCapsules", [])
                dates = [c["deliveryDateTime"] for c in capsules]
                return str(dates)
            return "[]"
        except Exception:
            return "[]"

    return [create_capsule, count_capsules, get_capsules]


@app.post("/chat")
def chat(data: Input, request: Request):
    token = request.cookies.get("jwt")
    if not token:
        return {"reply": "Unauthorized", "capsuleCreated": False}

    state = get_session_state(data.session_id)
    message_normalized = normalize_text(data.message)
    state["active_request_key"] = message_normalized
    state["last_action"] = ""
    state["last_action_request_key"] = ""
    state["last_action_input"] = ""

    if re.fullmatch(r"(hi|hello|hii|hey)[!. ]*", message_normalized):
        return {
            "reply": "Hey! What do you want to do with your time capsule?",
            "capsuleCreated": False,
        }

    memory = get_memory(data.session_id)
    tools = create_tools(request, data.session_id)

    prompt = hub.pull("hwchase17/react")
    agent = create_react_agent(llm=llm, tools=tools, prompt=prompt)

    agent_executor = AgentExecutor(
        agent=agent,
        tools=tools,
        memory=memory,
        verbose=True,
        handle_parsing_errors=True,
        max_iterations=2,
    )

    system_instruction = """
You are an AI assistant for a Time Capsule app.

Rules:
- If a tool succeeds, stop immediately and return Final Answer.
- Never call more than one tool for a single user request.
- For count_capsules always use Action Input: "".
- Never reuse tool output as Action Input.
- After any tool result, return Final Answer directly.
"""

    try:
        result = agent_executor.invoke({
            "input": system_instruction + "\nUser: " + data.message
        })

        output = (result.get("output") or "").strip()

        # 🔥 detect bad/agent-failure outputs
        bad_signals = [
            "iteration",
            "agent stopped",
            "could not parse",
            "invalid or incomplete response",
            "error"
        ]

        if not output or any(sig in output.lower() for sig in bad_signals):
            output = "I can help you create a capsule or count your capsules."

    except Exception:
        # 🔥 hard fallback
        output = "I can help you create a capsule or count your capsules."

    # ✅ safer success detection
    capsule_created = "capsule created" in output.lower()

    return {
        "reply": output,
        "capsuleCreated": capsule_created
    }

