import React, { useState } from "react";
import MainLayout from "../../GeneralComponent/Layout/MainLayout";
import { ShoppingBag, Users, Store, XCircle, TrendingUp } from "lucide-react";
import { ArchiveBoxIcon as Icon } from "@heroicons/react/24/outline";
function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);

  const summaryMetrics = [
    {
      title: "Orders",
      color: "text-orange-500",
      icon: <ShoppingBag className="h-5 w-5 text-orange-500 -mt-8" />,
      metrics: [
        { label: "Live Orders", value: "50" },
        { label: "Completed Orders", value: "85" },
        { label: "Cancelled Orders", value: "05" },
        { label: "Order Ratio", value: "20%", trend: "up" },
      ],
    },
    {
      title: "Merchant",
      color: "text-pink-500",
      icon: <Store className="w-6 h-6 text-pink-500 -mt-8" />,
      metrics: [
        { label: "Active Shops", value: "100" },
        { label: "Closed Shops", value: "12" },
        { label: "New Shops", value: "20" },
        { label: "Total Shops", value: "112" },
      ],
    },
    {
      title: "Delivery partner",
      color: "text-green-500",
      icon: <Users className="w-6 h-6 text-green-500 -mt-8" />,
      metrics: [
        { label: "Active Started", value: "50" },
        { label: "Active Order based", value: "100" },
        { label: "New Partners", value: "05" },
        { label: "Total Partners", value: "150" },
      ],
    },
  ];

  const orderData = [
    {
      shopName: "KFC",
      status: "OPEN",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      shopName: "Burger King",
      status: "OPEN",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      shopName: "Thalappakatti Biryani",
      status: "OPEN",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      shopName: "Ponram Biryani",
      status: "OPEN",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      shopName: "Aachi's Restaurant",
      status: "10:00 PM",
      orders: "75",
      live: "-",
      completed: "75",
    },
    {
      shopName: "Velu Biryani",
      status: "OPEN",
      orders: "75",
      live: "05",
      completed: "70",
    },
  ];

  const deliveryPartners = [
    {
      partnerId: "#001258",
      status: "ONLINE",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      partnerId: "#001258",
      status: "OFFLINE",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      partnerId: "#001258",
      status: "ONLINE",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      partnerId: "#001258",
      status: "LEAVE",
      orders: "-",
      live: "-",
      completed: "-",
    },
    {
      partnerId: "#001258",
      status: "ONLINE",
      orders: "75",
      live: "05",
      completed: "70",
    },
    {
      partnerId: "#001258",
      status: "ONLINE",
      orders: "75",
      live: "05",
      completed: "70",
    },
  ];

  return (
    <MainLayout headerName={"Dashboard"}>
      <div className="p-6 space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {summaryMetrics.map((section, idx) => (
            <div className="relative bg-white rounded-lg p-4 shadow-md">
              {/* Floating Circle Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white  w-20 h-20 rounded-full flex items-center justify-center">
                {section.icon}
              </div>

              {/* Card Content */}
              <div className="relative mt-6 text-center">
                <h2
                  className={`absolute ${
                    section.title == "Delivery partner"
                      ? "left-[7.2rem]"
                      : "left-[7.9rem]"
                  }  -top-5 font-medium ${section.color}`}
                >
                  {section.title}
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {section.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-semibold">{metric.value}</p>
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      {metric.trend && (
                        <div className="flex items-center justify-center text-green-500 text-sm">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {metric.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders and Delivery Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Orders Table */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-medium">Orders</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>12:00 PM</span>
                <span>TODAY</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-sm text-gray-500">
                  <tr>
                    <th className="text-left py-2">SHOP NAME</th>
                    <th className="text-left py-2">STATUS</th>
                    <th className="text-left py-2">ORDERS</th>
                    <th className="text-left py-2">LIVE</th>
                    <th className="text-left py-2">COMPLETED</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3">{row.shopName}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded text-xs
                            ${
                              row.status === "OPEN"
                                ? "text-green-600"
                                : row.status.includes("PM")
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>{row.orders}</td>
                      <td>{row.live}</td>
                      <td>{row.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delivery Partners Table */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <h2 className="font-medium">Delivery partner</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>12:00 PM</span>
                <span>TODAY</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-sm text-gray-500">
                  <tr>
                    <th className="text-left py-2">PARTNER ID</th>
                    <th className="text-left py-2">STATUS</th>
                    <th className="text-left py-2">ORDERS</th>
                    <th className="text-left py-2">LIVE</th>
                    <th className="text-left py-2">COMPLETED</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryPartners.map((partner, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3">{partner.partnerId}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded text-xs
                            ${
                              partner.status === "ONLINE"
                                ? "text-green-600"
                                : partner.status === "OFFLINE"
                                ? "text-red-600"
                                : partner.status === "LEAVE"
                                ? "text-orange-600"
                                : "text-gray-600"
                            }`}
                        >
                          {partner.status}
                        </span>
                      </td>
                      <td>{partner.orders}</td>
                      <td>{partner.live}</td>
                      <td>{partner.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
