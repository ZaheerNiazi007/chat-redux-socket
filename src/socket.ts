// src/socket.ts
const socket = new WebSocket("ws://localhost:8080")

socket.onopen = () => {
  console.log("Connected to WebSocket")
}

socket.onclose = () => {
  console.log("Disconnected from WebSocket")
}

socket.onerror = (error) => {
  console.error("WebSocket error:", error)
}

// Use localStorage to simulate a WebSocket server (broadcasts messages to other tabs)
window.addEventListener("storage", (event) => {
  if (event.key === "chat-message") {
    const newMessage = JSON.parse(event.newValue || "{}")
    console.log("Received message in storage:", newMessage)
    // Handle message received and update UI accordingly
  }
})

export default socket
