import { useDispatch } from 'react-redux';
import SocketContext from '../context/SocketContext';
import { addMessage } from '../store/slices/messagesSlice';
import { useEffect } from 'react';
// import from slice channels !!

const ApiProvider = ({ children, socket }) => {
    const dispatch = useDispatch();

    const socketApi = {
        addMessage: (data) => socket.emit('newMessage', data),
        addChannel: (data) => socket.emit('newChannel', data),
        renameChannel: (data) => socket.emit('renameChannel', data),
        removeChannel: (data) => socket.emit('removeChannel', data)
    }


    useEffect(() => {
        socket.on('newMessage', (message) => {
          dispatch(addMessage(message));
        });
        // socket.on('newChannel', (channel) => {
        //   dispatch(channelsActions.addChannel(channel));
        // });
        // socket.on('renameChannel', (channelName) => {
        //   dispatch(channelsActions.renameChannel(channelName));
        // });
        // socket.on('removeChannel', (channelId) => {
        //   dispatch(channelsActions.removeChannel(channelId));
        // });
      }, [socket, dispatch]);

    return (
    <SocketContext.Provider value={socketApi}>
        {children}
    </SocketContext.Provider>
    );
}

export default ApiProvider;