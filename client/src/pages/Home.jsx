import React from "react";
import { format } from "date-fns";
import CapsuleTimeLine from "../components/homePage/CapsuleTimeLine";
import AddCapsule from "../components/homePage/AddCapsule";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Capsules" value={capsules.length} />
          <StatCard
            label="Scheduled"
            value={capsules.filter((c) => {
              const deliveryDate = c?.deliveryDateTime ? new Date(c.deliveryDateTime) : null;
              return (
                c &&
                !c.isDelivered &&
                deliveryDate &&
                !isNaN(deliveryDate.getTime()) &&
                deliveryDate > new Date()
              );
            }).length}
          />
          <StatCard label="Delivered" value={capsules.filter((c) => c?.isDelivered).length} />
          <StatCard
            label="Next Delivery"
            value={
              capsules.length
                ? (() => {
                    const next = capsules
                      .filter((c) => c && !c.isDelivered && c.deliveryDateTime)
                      .sort((a, b) => {
                        const dateA = new Date(a.deliveryDateTime);
                        const dateB = new Date(b.deliveryDateTime);
                        return dateA - dateB;
                      })[0];
                    return next && next.deliveryDateTime
                      ? format(new Date(next.deliveryDateTime), "dd MMM yyyy")
                      : "—";
                  })()
                : "—"
            }
          />
        </div>

        {/* Add New Capsule */}
        <AddCapsule/>

        {/* Capsule Timeline */}
        <CapsuleTimeLine/>
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
