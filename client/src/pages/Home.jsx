import React from "react";
import CapsuleTimeLine from "../components/homePage/CapsuleTimeLine";
import AddCapsule from "../components/homePage/AddCapsule";
import StatsCards from "../components/homePage/StatsCards";

const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">📦 Time Capsule Dashboard</h1>
          <p className="text-gray-600 text-lg">Write messages to your future self ✨</p>
        </div>

        {/* Stats Cards */}
        <StatsCards/>

        {/* Add New Capsule */}
        <AddCapsule/>

        {/* Capsule Timeline */}
        <CapsuleTimeLine/>
      </div>
    </div>
  );
};



export default Home;
