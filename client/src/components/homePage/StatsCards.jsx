import React from 'react'
import { useCapsuleStore } from "../../store/useCapsuleStore";
import { format } from "date-fns";
const StatsCards = () => {
      const { capsules} = useCapsuleStore();
  return (
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
  )
}
const StatCard = ({ label, value }) => (
    <div className="bg-white rounded-lg shadow text-center p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-purple-700 mt-1">{value}</p>
    </div>
  );

export default StatsCards
