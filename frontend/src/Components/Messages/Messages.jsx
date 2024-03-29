import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import MessagesHeader from './MessagesHeader';
import MessagesBox from './MessagesBox';
import MessagesForm from './MessagesForm';

const Messages = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  const currentMessages = messages
    .filter((message) => message.channelId === currentChannelId);

  const currentChannel = channels
    .find((channel) => channel.id === currentChannelId);

  return (
    <Col className="p-0 col-9 h-100" style={{backgroundColor:'black', color:'#2272ff99'}}>
      <div className="d-flex flex-column h-100">
        <MessagesHeader currentMessages={currentMessages} currentChannel={currentChannel} />
        <MessagesBox currentMessages={currentMessages} />
        <MessagesForm />
      </div>
    </Col>
  );
};

export default Messages;
