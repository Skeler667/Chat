import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { hideModal } from '../../store/slices/modalsSlice';
import useApi from '../../hooks/useApi';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

const RemoveModal = () => {
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.modals.channelId);
  const chatApi = useApi();
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      setSending(true);
      await chatApi.removeChannel({ id: channelId });
      dispatch(hideModal());
      setSending(false);
    } catch (err) {
      console.error(err);
      setSending(false);
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('removeModal.confirm')}</p>
        <div>
          <Button
            className="m-1"
            variant="secondary"
            role="button"
            onClick={() => dispatch(hideModal())}
          >
            {t('removeModal.cancel')}
          </Button>
          <Button
            className="m-1"
            variant="danger"
            role="button"
            onClick={handleRemove}
          >
            {sending ? <Spinner size="sm" /> : null}
            {t('removeModal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;