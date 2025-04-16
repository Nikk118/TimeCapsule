import React, { useState, useEffect } from "react";
import { useCapsuleStore } from "../store/useCapsuleStore";
import { format } from 'date-fns';

const Home = () => {
  const [form, setForm] = useState({
    message: "",
    deliveryDateTime: "",
    files: [],
  });

  const { capsules, getCapsules, createCapsule, isAddingCapsule } = useCapsuleStore();

  useEffect(() => {
    getCapsules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // convert FileList to array
  
    setForm((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles], // add to existing files
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
      setForm({
        message: "",
        deliveryDateTime: "",
        files: [],
      });
    } catch (error) {
      alert("Failed to create capsule. Please try again.");
    }
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
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Message"
          />

          <input
            name="deliveryDateTime"
            type="datetime-local"
            value={form.deliveryDateTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Delivery Date and Time"
          />

          <input
            type="file"
            name="media"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            aria-label="Upload Media"
          />

          <button
            onClick={handleSubmit}
            disabled={isAddingCapsule}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            {isAddingCapsule ? "Saving..." : "Save Capsule"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">My Capsules</h2>
          {Array.isArray(capsules) && capsules.length === 0 ? (
            <p className="text-gray-500">No capsules yet.</p>
          ) : (
            <ul className="space-y-3">
              {capsules.map((capsule, idx) => (
                <li
                  key={idx}
                  className="bg-gray-50 p-4 rounded-md border border-gray-200"
                >
                  <p className="font-medium">Pending Capsule</p>
                  <p className="text-sm text-gray-500">
                    To be delivered on:{" "}
                    {capsule.deliveryDateTime
                      ? format(new Date(capsule.deliveryDateTime), 'dd/MM/yyyy HH:mm')
                      : "Invalid date"}
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
