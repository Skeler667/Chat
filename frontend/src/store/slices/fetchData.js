import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import useAuth from '../../hooks/useAuth.hook';

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (headers) => {
    const { logOut } = useAuth();
    const response = await axios.get('/api/v1/data', headers);
    if (response.status === '401') {
      logOut();
    }
    return response.data;
  },
);
export default fetchData;
