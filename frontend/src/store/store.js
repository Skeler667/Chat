import { configureStore } from '@reduxjs/toolkit';
import channelSlice from './slices/channelSlice';
import messagesSlice from './slices/messagesSlice';

export default configureStore({
    reducer: {
        channels: channelSlice,
        messages: messagesSlice,
    }
})