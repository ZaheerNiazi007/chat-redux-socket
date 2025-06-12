import React, { useEffect, useRef } from "react"
import ChatBubble from "./ChatBubble"

interface Message {
  text: string
  sender: string
  timestamp?: string
}

interface ChatContainerProps {
  messages: Message[]
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="space-y-2">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Start a conversation
          </h3>
          <p className="text-muted-foreground">
            Send a message to begin chatting
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg.text}
            sender={msg.sender}
            isOwn={msg.sender === "You"}
            timestamp={msg.timestamp}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatContainer
