import React, { useState, useEffect } from "react";
import { useCapsuleStore } from "../store/useCapsuleStore";
import { format } from "date-fns";

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

  console.log(capsules);
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">📦 Time Capsule Dashboard</h1>
          <p className="text-gray-600 text-lg">Write messages to your future self ✨</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Capsules" value={capsules.length} />
          <StatCard
            label="Scheduled"
            value={capsules.filter((c) => {
              const deliveryDate = new Date(c.deliveryDateTime);
              return !c.isDelivered && !isNaN(deliveryDate.getTime()) && deliveryDate > new Date();
            }).length}
          />
          <StatCard label="Delivered" value={capsules.filter((c) => c.isDelivered).length} />
          <StatCard
            label="Next Delivery"
            value={
              capsules.length
                ? (() => {
                    const next = capsules
                      .filter((c) => !c.isDelivered)
                      .sort((a, b) => new Date(a.deliveryDateTime) - new Date(b.deliveryDateTime))[0];

                    return next ? format(new Date(next.deliveryDateTime), "dd MMM yyyy") : "—";
                  })()
                : "—"
            }
          />
        </div>

        {/* Add New Capsule */}
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

          <input
            type="file"
            name="media"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />

          <button
            onClick={handleSubmit}
            disabled={isAddingCapsule}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            {isAddingCapsule ? "Saving..." : "Save Capsule"}
          </button>
        </div>

        {/* Capsule Timeline */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">🕰️ Capsule Timeline</h2>
          {Array.isArray(capsules) && capsules.filter((capsule) => !capsule.isDelivered).length === 0 ? (
            <p className="text-gray-500">No scheduled capsules yet.</p>
          ) : (
            <ul className="space-y-4">
              {capsules
                .filter((capsule) => !capsule.isDelivered) // Only show non-delivered capsules
                .sort((a, b) => new Date(a.deliveryDateTime) - new Date(b.deliveryDateTime))
                .map((capsule, idx) => (
                  <li key={idx} className="border-l-4 border-purple-400 pl-4 py-2 relative bg-gray-50 rounded-md">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
                    <p className="font-medium text-gray-800">
                      Your Capsule
                    </p>
                    <p className="text-sm text-gray-500">
                      Delivery Date: {capsule.deliveryDateTime ? format(new Date(capsule.deliveryDateTime), "dd/MM/yyyy HH:mm") : "Invalid date"}
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

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow text-center p-5">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-purple-700 mt-1">{value}</p>
  </div>
);

export default Home;
