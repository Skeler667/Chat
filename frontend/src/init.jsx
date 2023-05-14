import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import resources from './locales/index.js';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store';
import ApiProvider from './Components/ApiProvider';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
      // socket.on('newMessage', (payload) => {
      //   store.dispatch(addMessage(payload))
      // });

      // const addMessage = () => {
      //   socket.emit('newMessage', { body: '123', channelId: 1, username: 'oleg' });
      // }
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ApiProvider socket={socket}>
          <App />
          </ApiProvider>
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
  );
};

export default init;