import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk(
    'channels/fetchData',
    async (headers) => {
        const response = await axios.get('/api/v1/data', headers)
        return response.data
    }
)