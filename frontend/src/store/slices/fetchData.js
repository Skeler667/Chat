import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/api';

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (headers, { rejectWithValue }) => {
    try {
      const response = await getData(headers);
      const { data } = response;
      return data;
    } catch (err) {
      return rejectWithValue({
        message: err?.message,
        status: err?.response?.status,
        isAxiosError: err?.isAxiosError,
      });
    }
  },
);
export default fetchData;
