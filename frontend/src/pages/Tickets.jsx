import React, { useEffect, useState } from "react";
import { getTickets, updateTicket, deleteTicket } from "../api/tickets.api"; // your backend API methods

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getTickets(); // should return array of tickets from DB
      setTickets(data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Handle resolving a ticket
  const handleResolve = async (ticketId) => {
    try {
      await updateTicket(ticketId, { status: "RESOLVED" });
      fetchTickets(); // refresh list
    } catch (err) {
      console.error("Error resolving ticket:", err);
    }
  };

  // Handle viewing a ticket
  const handleView = (ticket) => {
    alert(
      `Ticket Details:\n\nUser ID: ${ticket.userId}\nMessage: ${ticket.message}\nStatus: ${ticket.status}`,
    );
  };

  const filters = ["All", "OPEN", "IN_PROGRESS", "CLOSED", "RESOLVED"];

  const filteredTickets =
    activeFilter === "All"
      ? tickets
      : tickets.filter((ticket) => ticket.status === activeFilter);

  const statusStyle = {
    OPEN: "bg-red-100 text-red-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    CLOSED: "bg-gray-100 text-gray-700",
    RESOLVED: "bg-green-100 text-green-700",
  };

  if (loading) return <div>Loading tickets...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Support Tickets</h2>
        <p className="text-gray-500 text-sm">
          Manage and resolve customer issues
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {filter.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Ticket ID</th>
              <th className="p-4">User ID</th>
              <th className="p-4">Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">
                  TCK-{ticket.id.toString().padStart(3, "0")}
                </td>
                <td className="p-4 text-gray-600">{ticket.userId}</td>
                <td className="p-4 text-gray-600 truncate max-w-xs">
                  {ticket.message}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${statusStyle[ticket.status]}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => handleView(ticket)}
                  >
                    View
                  </button>
                  {ticket.status !== "RESOLVED" && (
                    <button
                      className="text-green-600 text-sm hover:underline"
                      onClick={() => handleResolve(ticket.id)}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <div className="p-4 text-gray-500">
            No tickets found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
