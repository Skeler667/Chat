import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      const storage = state;
      storage.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const storage = state;
      storage.messages = action.payload.messages;
    });
    // builder.addCase(fetchData.rejected, (state, action) => {
    //   state.channels = action.payload.channels
    // })
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
