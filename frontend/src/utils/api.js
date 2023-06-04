import axios from 'axios';
import routes from './routes';

const setLogin = (values) => axios.post(routes.loginPath(), values);
const getData = (headers) => axios.get(routes.dataPath(), headers);
const addSignUp = (userData) => axios.post(routes.signupPath(), userData);

export { setLogin, getData, addSignUp };
