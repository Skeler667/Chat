import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channels: [],
    currentChannelID: 1, 
}

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannels(state, action) {
            state.channels = action.payload
        },
        addChannel(state, action) {
            state.channels.push(action.payload)
        }
    }
})

export const { setChannels, addChannel } = channelSlice.actions
export default channelSlice.reducer