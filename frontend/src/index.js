import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init.jsx';
import { io } from 'socket.io-client';

const app = async () => {
  const socket = io()
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init(socket));
};
app();
