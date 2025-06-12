import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Message {
  text: string
  sender: string
  timestamp?: string // Add timestamp field
}

interface ChatState {
  messages: Message[]
}

const initialState: ChatState = {
  messages: [],
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const newMessage = action.payload
      // If the timestamp is not provided, set it to the current time
      if (!newMessage.timestamp) {
        newMessage.timestamp = new Date().toISOString()
      }
      state.messages.push(newMessage)
    },
  },
})

export const { addMessage } = chatSlice.actions

export default chatSlice.reducer
