import { configureStore } from '@reduxjs/toolkit';
import channelSlice from './slices/channelSlice';
import messagesSlice from './slices/messagesSlice';
import modalsSlice from './slices/modalsSlice';

export default configureStore({
  reducer: {
    channels: channelSlice,
    messages: messagesSlice,
    modals: modalsSlice,
  },
});
