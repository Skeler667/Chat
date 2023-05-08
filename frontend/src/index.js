import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init.jsx';
// import { io } from 'socket.io-client';
// const socket = io('ws://localhost:3000/');
//   socket.onopen = () => {
//     console.log('ура победа')
//   };

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
