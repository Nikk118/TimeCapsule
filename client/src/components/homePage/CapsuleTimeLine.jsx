import React, {useEffect } from "react";
import { useCapsuleStore } from "../../store/useCapsuleStore";
import { format } from "date-fns";

const CapsuleTimeLine = () => {
  const { capsules, getCapsules } = useCapsuleStore();

    useEffect(() => {
        getCapsules();
      }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-2xl font-semibold mb-4 text-purple-600">🕰️ Capsule Timeline</h2>
    {Array.isArray(capsules) && capsules.filter((capsule) => capsule && !capsule.isDelivered).length === 0 ? (
      <p className="text-gray-500">No scheduled capsules yet.</p>
    ) : (
      <ul className="space-y-4">
        {capsules
          .filter((capsule) => capsule && !capsule.isDelivered && capsule.deliveryDateTime)
          .sort((a, b) => {
            const dateA = new Date(a.deliveryDateTime);
            const dateB = new Date(b.deliveryDateTime);
            return dateA - dateB;
          })
          .map((capsule, idx) => (
            <li key={idx} className="border-l-4 border-purple-400 pl-4 py-2 relative bg-gray-50 rounded-md">
              <div className="absolute -left-[9px] top-2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
              <p className="font-medium text-gray-800">Your Capsule</p>
              <p className="text-sm text-gray-500">
                Delivery Date:{" "}
                {capsule.deliveryDateTime
                  ? format(new Date(capsule.deliveryDateTime), "dd/MM/yyyy HH:mm")
                  : "Invalid date"}
              </p>
            </li>
          ))}
      </ul>
    )}
  </div>
  )
}

export default CapsuleTimeLine
