import i18next from 'i18next';
import Rollbar from 'rollbar';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import leoProfanity from 'leo-profanity';
import App from './App';
import resources from './locales/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import ApiProvider from './Components/ApiProvider';
import { addMessage } from './store/slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './store/slices/channelSlice';

const init = async (socket) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel({
      id: payload.id,
      name: payload.name,
    }));
  });
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('ru'));
  leoProfanity.add(leoProfanity.getDictionary('en'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR,
    environment: 'production',
  };

  const rollbar = new Rollbar(rollbarConfig);

  return (
    <RollbarProvider config={rollbar}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </RollbarProvider>
  );
};
export default init;
