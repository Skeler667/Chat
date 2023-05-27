import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { modalType, channelId } = action.payload;
      const storage = state;
      storage.modalType = modalType;
      storage.channelId = channelId;
    },
    hideModal: (state) => {
      const storage = state;
      storage.modalType = null;
      storage.channelId = null;
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
