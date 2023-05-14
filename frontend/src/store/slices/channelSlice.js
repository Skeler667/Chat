import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
    channels: [],
    currentChannelId: DEFAULT_CHANNEL_ID,
    error: null,
}

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannels(state, action) {
            state.channels = action.payload
          },
        setCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload;
          },
          addChannel: (state, action) => {
            const channel = action.payload;
            state.channels.push(channel);
          },
          removeChannel: (state, action) => {
            const { id } = action.payload;
            state.channels = state.channels.filter((channel) => channel.id !== id);
            if (id === state.currentChannelId) {
              state.currentChannelId = DEFAULT_CHANNEL_ID;
            }
          },
          renameChannel: (state, action) => {
            const { id, name } = action.payload;
            state.channels = state.channels
              .map((channel) => (channel.id === id ? ({ ...channel, name }) : channel));
          },
    }
})

export const { renameChannel, removeChannel, addChannel, setCurrentChannelId, setChannels } = channelSlice.actions
export default channelSlice.reducer