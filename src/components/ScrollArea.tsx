import React from "react"

// ScrollArea Component
interface ScrollAreaProps {
  children: React.ReactNode
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
  return (
    <div
      className="flex-1 px-6 py-4 overflow-y-auto scroll-smooth"
      style={{ maxHeight: "calc(100vh - 4rem)" }} // Constrain height
    >
      {children}
    </div>
  )
}

export default ScrollArea
