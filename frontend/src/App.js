import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ChatPage from './Components/ChatPage';
import NotFoundPage from './Components/NotFoundPage';
import PrivateRoute from './Components/PrivateRoute';
import { AuthProvider } from './Components/AuthProvider';


function App() {
  return (
    <AuthProvider>
        <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path='/' element={<ChatPage/>} />
            </Route>
              <Route path='login' element={<LoginPage/>} />
              <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
