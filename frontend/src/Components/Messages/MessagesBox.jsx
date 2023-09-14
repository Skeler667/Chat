import { useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth.hook';

const MessagesBox = ({ currentMessages }) => {
  const { user } = useAuth();
  const scrollTrigger = useRef();
  useEffect(() => {
    scrollTrigger.current.scrollIntoView({
      behaivor: 'smooth',
    });
  });

  const renderMessages = () => currentMessages
    .map(({ id, body, username }) => {
      if (username === user.username) {
        return (
          <div key={id} className="text-break mb-2">
            <b className="bg-dark p-1">{username}</b>
            :
            {' '}
            {body}
          </div>
        );
      }
      return (
        <div key={id} className="text-break mb-2">
          <b style={{color:'#959cf8'}}>{username}</b>
          :
          {' '}
          {body}
        </div>
      );
    });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ height: '68vh' }}>
      {renderMessages()}
      <span ref={scrollTrigger} />
    </div>
  );
};

export default MessagesBox;
