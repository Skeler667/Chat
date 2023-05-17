import { useDispatch } from 'react-redux';
import SocketContext from '../context/SocketContext';
import { addMessage } from '../store/slices/messagesSlice';
import { useEffect } from 'react';
// import from slice channels !!

const ApiProvider = ({ children, socket }) => {
    const dispatch = useDispatch();

    const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    let state = 'pending'; // eslint-disable-line
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }

      reject();
    });
  });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
    // createChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
    // renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
    // removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
  };


    // useEffect(() => {
    //     socket.on('newMessage', (message) => {
    //       dispatch(addMessage(message));
    //     });
        // socket.on('newChannel', (channel) => {
        //   dispatch(channelsActions.addChannel(channel));
        // });
        // socket.on('renameChannel', (channelName) => {
        //   dispatch(channelsActions.renameChannel(channelName));
        // });
        // socket.on('removeChannel', (channelId) => {
        //   dispatch(channelsActions.removeChannel(channelId));
        // });
      // }, [socket, dispatch]);

    return (
    <SocketContext.Provider value={api}>
        {children}
    </SocketContext.Provider>
    );
}

export default ApiProvider;