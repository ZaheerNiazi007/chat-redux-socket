import React from "react"

interface ChatBubbleProps {
  message: string
  sender: string
  isOwn: boolean
  timestamp?: string
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  isOwn,
  timestamp,
}) => {
  return (
    <div
      className={`flex w-full mb-4 animate-fade-in ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
          isOwn
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
            : "bg-card border rounded-bl-md"
        }`}
      >
        {!isOwn && (
          <div className="text-xs font-medium text-muted-foreground mb-1">
            {sender}
          </div>
        )}
        <div
          className={`text-sm leading-relaxed ${isOwn ? "text-white" : "text-foreground"}`}
        >
          {message}
        </div>
        {timestamp && (
          <div
            className={`text-xs mt-1 opacity-70 ${
              isOwn ? "text-blue-100" : "text-muted-foreground"
            }`}
          >
            {timestamp}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatBubble
