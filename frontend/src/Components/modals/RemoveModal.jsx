import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../store/slices/modalsSlice';
import useApi from '../../hooks/useApi';

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
      toast.warning(t('removeModal.success'), { icon: '🔥' });
      dispatch(hideModal());
      setSending(false);
    } catch (err) {
      toast.error(t('errors.unknown'), { icon: '🚩' });
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
        <div className="d-flex justify-content-between">
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
