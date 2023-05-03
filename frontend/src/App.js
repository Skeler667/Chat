import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ChatPage from './Components/ChatPage';
import NotFoundPage from './Components/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<ChatPage/>} />
            <Route path='login' element={<LoginPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
