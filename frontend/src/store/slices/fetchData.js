import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import useAuth from '../../hooks/useAuth.hook';

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (headers) => {
    const { logOut } = useAuth;
    try {
      const response = await axios.get('/api/v1/data', headers)
      return response.data;
    } catch (error) {
      logOut();
      console.error(error);
      console.log('error');
    }
  },
);
export default fetchData;
