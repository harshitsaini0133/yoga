import React, { useEffect, useState } from "react";
import { getMyAssignedUsers } from "../api/dietician";
import { getMessages, sendMessage } from "../api/message.api";

const Chats = () => {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Fetch assigned users on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getMyAssignedUsers(); // [{id: 1}, {id: 2}]
        console.log(users);
        setAssignedUsers(users);
        if (users.length) setSelectedUserId(users[0].id); // select first by default
      } catch (err) {
        console.error("Error fetching assigned users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch messages when selected user changes
  // useEffect(() => {
  //   if (!selectedUserId) return;

  //   const fetchMsgs = async () => {
  //     try {
  //       const msgs = await getMessages(selectedUserId); // API expects userId
  //       setMessages(msgs);
  //     } catch (err) {
  //       console.error("Error fetching messages:", err);
  //     }
  //   };
  //   fetchMsgs();
  // }, [selectedUserId]);
  useEffect(() => {
    if (!selectedUserId) return;

    const fetchMsgs = async () => {
      try {
        const msgs = await getMessages(selectedUserId); // API returns [{id, message, userId, dieticianId, createdAt}]

        const formatted = msgs.map((msg) => ({
          id: msg.id,
          sender: msg.dieticianId === 3 ? "trainer" : "user", // replace 3 with logged-in dietician id
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formatted);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMsgs();
  }, [selectedUserId]);

  // Send a new message
  const handleSend = async () => {
    if (!newMsg.trim() || !selectedUserId) return;
    try {
      await sendMessage({ userId: selectedUserId, text: newMsg });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "trainer",
          text: newMsg,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex h-[80vh] bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Left Sidebar - Assigned Users */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 font-semibold text-lg border-b">Assigned Users</div>
        {assignedUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
              selectedUserId === user.id ? "bg-white" : ""
            }`}
          >
            <p className="font-medium">User ID: {user.id}</p>
          </div>
        ))}
      </div>

      {/* Right Chat Window */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <div className="p-4 border-b font-semibold">
          {selectedUserId
            ? `Chat with User ${selectedUserId}`
            : "Select a user"}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "trainer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                  msg.sender === "trainer"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs mt-1 opacity-70">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        {selectedUserId && (
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
