import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import useAuth from '../hooks/useAuth.hook';
import fetchData from '../store/slices/fetchData';
import Channels from './Channels';
import Messages from './Messages/Messages';
import getModal from './modals/index';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeaders, logOut } = useAuth();
  const loading = useSelector((state) => state.channels.loading);
  const modalType = useSelector((state) => state.modals.modalType);
  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const headers = getAuthHeaders();
      dispatch(fetchData(headers))
        .catch((e) => {
          if (e.status === 401) {
            logOut();
          }
          if (!e.isAxiosError) {
            toast.error(t('errors.unknown'));
            return;
          }
          if (e.isAxiosError) {
            toast.error(t('errors.network'));
          }
        });
    };
    getData();
  }, [dispatch, getAuthHeaders, logOut, t]);

  const renderModal = (type) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal />;
  };

  if (loading) {
    return (
      <div className="d-flex mt-5 justify-content-center align-items-center h-100">
        <Spinner
          animation="border"
          variant="primary"
            // style={{ width: '5rem', height: '5rem', marginTop:'250px' }}
          className="justify-self-center lg h-3 mt-5 w-5"
        />
      </div>
    );
  }

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Container className="container h-100 my-4 overflow-hidden rounded shadow">
            <Row className="row h-100 bg-white flex-md-row">
              <Channels />
              <Messages />
              <ToastContainer />
            </Row>
            {renderModal(modalType)}
          </Container>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
