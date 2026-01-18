"use client";

import { useState } from "react";
import Dropdown from "@/components/atoms/Dropdown";

export default function ItemRequestsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [testStatus, setTestStatus] = useState("pending"); 

  const tabs = ["All", "Pending", "Approved", "Completed", "Rejected"];


  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="font-medium text-lg leading-7 mb-6">Item Requests</h1>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`py-2 px-6 rounded-md transition ${
              activeTab === tab.toLowerCase()
                ? "bg-primary text-white"
                : "bg-gray-fill text-gray-text-dark hover:bg-gray-stroke"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <p>Dropdown:</p>
        <Dropdown
          options={statusOptions}
          value={testStatus}
          onChange={(newStatus) => setTestStatus(newStatus)}
        />
      </div>


    </div>
  );
}