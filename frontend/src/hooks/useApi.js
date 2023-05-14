import { useContext } from 'react';
import SocketContext from '../context/SocketContext';

const useApi = () => useContext(SocketContext);

export default useApi;