import { useDispatch, useSelector } from "react-redux"
import { Container, Row } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth.hook"
import { useEffect } from "react";
import { fetchData } from "../store/slices/fetchData";
import Spinner from 'react-bootstrap/Spinner';
import Channels from "./Channels";
import Messages from "./Messages";
import getModal from './modals/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatPage = () => {
  const notify = () => toast("Wow so easy!");


    const dispatch = useDispatch()
    const { getAuthHeaders } = useAuth()
    const loading = useSelector((state) => state.channels.loading)
    const modalType = useSelector((state) => state.modals.modalType);

    useEffect(() => {
      dispatch(fetchData(getAuthHeaders()))
    }, [dispatch, getAuthHeaders])

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
            style={{ width: '5rem', height: '5rem', marginTop:'250px' }}
            className="justify-self-center lg"
          />
        </div>
      );
    }

    return (
    <>
    <Container style={{'width':'1400px'}}>
      <Row className="">
        <Channels/>
        <Messages/>
        <ToastContainer />
      </Row>
      {renderModal(modalType)}
    </Container>
    </>
    )
}
export default ChatPage