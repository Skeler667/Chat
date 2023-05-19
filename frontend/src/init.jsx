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
import { addMessage } from './store/slices/messagesSlice';
import { addChannel } from './store/slices/channelSlice';

const init = async (socket) => {

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  // socket.on('removeChannel', (payload) => {
  //   store.dispatch(actions.removeChannel({ channelId: payload.id }));
  // });
  // socket.on('renameChannel', (payload) => {
  //   store.dispatch(actions.renameChannel({
  //     channelId: payload.id,
  //     channelName: payload.name,
  //   }));
  // });
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
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