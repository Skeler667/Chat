import { useTranslation } from 'react-i18next';
import { BsCloudDownload } from 'react-icons/bs';
const MessagesHeader = ({ currentMessages, currentChannel }) => {
  const { t } = useTranslation();
  if (!currentChannel) {
    return <BsCloudDownload/>;
  }

  const count = currentMessages.length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          # 
          { currentChannel.name }
        </b>
      </p>
      <span className="text-muted">{t('messagesCount.key', { count })}</span>
    </div>
  );
};

export default MessagesHeader;