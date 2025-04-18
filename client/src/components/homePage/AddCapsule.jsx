import React, { useState } from "react";
import { useCapsuleStore } from "../../store/useCapsuleStore";


const AddCapsule = () => {
    const [form, setForm] = useState({
        message: "",
        deliveryDateTime: "",
        files: [],
      });
    
      const {createCapsule, isAddingCapsule } = useCapsuleStore();
    
    
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setForm((prev) => ({
          ...prev,
          files: [...prev.files, ...newFiles],
        }));
      };
    
      const handleSubmit = async () => {
        if (!form.message || !form.deliveryDateTime) {
          return alert("Please fill all fields");
        }
    
        const formData = new FormData();
        formData.append("message", form.message);
        formData.append("deliveryDateTime", form.deliveryDateTime);
        form.files.forEach((file) => formData.append("media", file));
    
        try {
          await createCapsule(formData);
          setForm({ message: "", deliveryDateTime: "", files: [] });
        } catch (error) {
          alert("Failed to create capsule. Please try again.");
        }
      };
  return (
    <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">✍️ Create a New Capsule</h2>

          <textarea
            name="message"
            placeholder="Dear future me..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            name="deliveryDateTime"
            type="datetime-local"
            value={form.deliveryDateTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Media <span className="text-gray-400 text-sm">(Optional)</span>
            <input
              type="file"
              name="media"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full mt-1 mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </label>

          <button
            onClick={handleSubmit}
            disabled={isAddingCapsule}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            {isAddingCapsule ? "Saving..." : "Save Capsule"}
          </button>
        </div>
  )
}

export default AddCapsule
