import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ChatPage from './Components/ChatPage';
import NotFoundPage from './Components/NotFoundPage';
import PrivateRoute from './Components/PrivateRoute';
import SignUpPage from './Components/SignUpPage';
import AuthProvider from './Components/AuthProvider';
import Header from './Components/Header';
import routes from './utils/routes';

const App = () => (
  <AuthProvider>
    <Header />
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={routes.home} element={<ChatPage />} />
      </Route>
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.signup} element={<SignUpPage />} />
      <Route path={routes.error} element={<NotFoundPage />} />
    </Routes>
  </AuthProvider>
);

export default App;
