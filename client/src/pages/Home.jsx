import React, { useState } from "react";
import axios from "axios";
import { authStore } from "../store/authStore";

const Home = () => {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [capsules, setCapsules] = useState([]);

  const handleAddCapsule = async () => {
    if (!message || !date) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("message", message);
    formData.append("deliveryDateTime", date);
    mediaFiles.forEach((file) => {
      formData.append("files", file);
    });

   
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
          📦 My Time Capsule Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Add a New Capsule</h2>

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setMediaFiles([...e.target.files])}
            className="w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />

          <button
            onClick={handleAddCapsule}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Save Capsule
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">My Capsules</h2>
          {capsules.length === 0 ? (
            <p className="text-gray-500">No capsules yet.</p>
          ) : (
            <ul className="space-y-3">
              {capsules.map((capsule, idx) => (
                <li
                  key={idx}
                  className="bg-gray-50 p-4 rounded-md border border-gray-200"
                >
                  <p className="font-medium">{capsule.message}</p>
                  <p className="text-sm text-gray-500">
                    To be delivered on:{" "}
                    {new Date(capsule.deliveryDateTime).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
