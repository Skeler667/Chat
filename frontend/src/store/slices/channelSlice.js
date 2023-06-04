import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channels: [],
  currentChannelId: DEFAULT_CHANNEL_ID,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      const storage = state;
      storage.channels = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      const storage = state;
      storage.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      const storage = state;
      const channel = action.payload;
      storage.channels.push(channel);
    },
    removeChannel: (state, action) => {
      const storage = state;
      const id = action.payload;
      storage.channels = storage.channels.filter((channel) => channel.id !== id);
      if (id === storage.currentChannelId) {
        storage.currentChannelId = DEFAULT_CHANNEL_ID;
      }
    },
    renameChannel: (state, action) => {
      const storage = state;
      const { id, name } = action.payload;
      storage.channels = storage.channels
        .map((channel) => (channel.id === id ? ({ ...channel, name }) : channel));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const storage = state;
      storage.channels = action.payload.channels;
      storage.error = null;
      storage.loading = false;
    });
    builder.addCase(fetchData.pending, (state) => {
      const storage = state;
      storage.loading = true;
      storage.error = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      const storage = state;
      storage.loading = false;
      storage.error = action.payload;
    });
  },
});

export const {
  renameChannel, removeChannel, addChannel, setCurrentChannelId, setChannels,
} = channelSlice.actions;
export default channelSlice.reducer;
