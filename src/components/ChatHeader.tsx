import React from "react"
import { MessageCircle, Users } from "lucide-react"

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-card border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Chat Room</h1>
          <p className="text-sm text-muted-foreground">Real-time messaging</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Users className="w-4 h-4" />
        <span className="text-sm">Online</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default ChatHeader
