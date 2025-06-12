import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../redux/chatSlice"
import socket from "../socket"
import ChatHeader from "../components/ChatHeader"

interface RootState {
  chat: {
    messages: { text: string; sender: string }[]
  }
}

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.chat.messages)
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    // Listen for incoming WebSocket messages (Receiver messages)
    socket.onmessage = (event: { data: string }) => {
      const data = JSON.parse(event.data)
      // Add the incoming message with a proper sender tag
      dispatch(addMessage({ text: data.text, sender: data.sender || "Other" }))
    }

    // Broadcast messages to localStorage, simulating a multi-tab communication
    window.addEventListener("storage", (event) => {
      if (event.key === "chat-message") {
        const newMessage = JSON.parse(event.newValue || "{}")
        dispatch(
          addMessage({
            text: newMessage.text,
            sender: newMessage.sender || "Other",
          })
        )
      }
    })

    return () => {
      socket.close()
    }
  }, [dispatch])

  const handleSendMessage = () => {
    if (message.trim()) {
      const msg = { text: message, sender: "You" }
      socket.send(JSON.stringify(msg)) // Send message via WebSocket
      dispatch(addMessage(msg)) // Update Redux state

      // Simulate broadcasting via localStorage to other tabs
      window.localStorage.setItem("chat-message", JSON.stringify(msg))

      setMessage("")
    }
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        <div className="flex-1 bg-background shadow-xl rounded-lg overflow-hidden border m-4 flex flex-col">
          <ChatHeader />
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              {/* Display the message sender (You or Other) */}
              <span
                className={`font-semibold ${msg.sender === "You" ? "text-green-500" : "text-blue-500"}`}
              >
                {msg.sender}:
              </span>
              {/* Message text */}
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="flex mt-4 space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
            placeholder="Type your message"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
