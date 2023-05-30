import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (headers, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/data', headers);
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
