import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ChatPage from './Components/ChatPage';
import NotFoundPage from './Components/NotFoundPage';
import PrivateRoute from './Components/PrivateRoute';
import SignUpPage from './Components/SignUpPage';
import { AuthProvider } from './Components/AuthProvider';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/login');
  socket.on('message', (message) => {
    console.log(message); 
  });
  socket.emit('message','Hello, my name is Client');

function App() {
  return (
    <AuthProvider>
        <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path='/' element={<ChatPage/>} />
            </Route>
              <Route path='login' element={<LoginPage/>} />
              <Route path='signup' element={<SignUpPage/>} />
              <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
