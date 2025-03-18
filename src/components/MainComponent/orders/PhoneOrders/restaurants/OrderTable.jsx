import React from "react";

const OrderTable = () => {
  const order = { id: "12345" }; // Example order ID
  const tableData = [
    {
      partnerId: "P0018",
      name: "John Doe",
      type: "Salaried",
      orders: 10,
      phone: "+91 98765 43210",
      distance: "3 km",
      status: "Pending",
    },
    // Add more rows here as needed
  ];

  return (
    <div className="w-full p-4 space-y-6">
      {/* Restaurant Card */}
      <div className="border rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/60"
            alt="Restaurant"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold text-lg">Restaurant Name</h2>
            <p className="text-sm text-gray-500">
              123, Sample Street, Coimbatore
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-sm">+91 98765 43210</p>
          <p className="text-sm text-gray-500">Open: 10:00 AM - 10:00 PM</p>
        </div>
      </div>

      {/* Customer Card */}
      <div className="border rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/60"
            alt="Customer"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold text-lg">Customer Name</h2>
            <p className="text-sm text-gray-500">
              456, Another Street, Coimbatore
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-sm">+91 98765 43211</p>
          <p className="text-sm text-gray-500">customer@example.com</p>
        </div>
      </div>

      {/* Order Section */}
      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="font-bold text-lg">ORDER ID: {order.id}</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Order Value</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Delivery Commission</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Time to Deliver</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 self-end">
            Find Delivery Partner
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="border rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">PARTNER ID</th>
              <th className="border p-2 text-left">NAME</th>
              <th className="border p-2 text-left">TYPE</th>
              <th className="border p-2 text-left">ORDERS</th>
              <th className="border p-2 text-left">PHONE NO</th>
              <th className="border p-2 text-left">DISTANCE</th>
              <th className="border p-2 text-left">ACTION</th>
              <th className="border p-2 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{row.partnerId}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.type}</td>
                <td className="border p-2">{row.orders}</td>
                <td className="border p-2">{row.phone}</td>
                <td className="border p-2">{row.distance}</td>
                <td className="border p-2">
                  <button className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    Assign
                  </button>
                </td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-lg ${
                      row.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : row.status === "Accepted"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
