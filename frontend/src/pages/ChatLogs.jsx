import React, { useEffect, useState } from "react";
import { getAllMessages } from "../api/message.api";

const ChatLogs = () => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Fetch all messages
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await getAllMessages();
        setMessages(res);

        groupConversations(res);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAllMessages();
  }, []);

  // Group messages by userId + dieticianId
  const groupConversations = (data) => {
    const grouped = {};

    data.forEach((msg) => {
      const key = `${msg.userId}-${msg.dieticianId}`;

      if (!grouped[key]) {
        grouped[key] = {
          id: key,
          userId: msg.userId,
          dieticianId: msg.dieticianId,
          messages: [],
          lastMessage: "",
          lastDate: "",
        };
      }

      grouped[key].messages.push(msg);

      grouped[key].lastMessage = msg.message;
      grouped[key].lastDate = msg.createdAt;
    });

    setConversations(Object.values(grouped));
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Chat Logs</h2>
        <p className="text-gray-500 text-sm">
          Monitor all user–dietician conversations
        </p>
      </div>

      {/* Conversations Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">User ID</th>
              <th className="p-4">Dietician ID</th>
              <th className="p-4">Last Message</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {conversations.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No chats found
                </td>
              </tr>
            )}

            {conversations.map((chat) => (
              <tr key={chat.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">User #{chat.userId}</td>

                <td className="p-4 text-gray-600">
                  Dietician #{chat.dieticianId}
                </td>

                <td className="p-4 text-gray-600 truncate max-w-xs">
                  {chat.lastMessage}
                </td>

                <td className="p-4 text-gray-600">
                  {formatDate(chat.lastDate)}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedChat(chat)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Chat Messages */}
      {selectedChat && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">
              User #{selectedChat.userId} ↔ Dietician #
              {selectedChat.dieticianId}
            </h3>

            <button
              onClick={() => setSelectedChat(null)}
              className="text-sm text-red-500"
            >
              Close
            </button>
          </div>

          <div className="space-y-4 max-h-100 overflow-y-auto">
            {selectedChat.messages.map((msg) => (
              <div key={msg.id} className="border rounded-lg p-3 bg-gray-50">
                <p className="text-sm font-medium">
                  {msg.userId === selectedChat.userId ? "User" : "Dietician"}
                </p>

                <p className="text-sm text-gray-700">{msg.message}</p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(msg.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatLogs;
