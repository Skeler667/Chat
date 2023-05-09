import { useDispatch, useSelector } from "react-redux"
import { Col, Container, Row, Nav, Form, Button } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth.hook"
import { BsFillSendFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { io } from 'socket.io-client';
import { useEffect } from "react";
import { addMessage } from "../store/slices/messagesSlice";
// import Spinner from 'react-bootstrap/Spinner';

const ChatPage = () => {
    const socket = io();
    const dispatch = useDispatch();
    useEffect(() => {
      socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload))
      });
    }, [dispatch, socket])

    const { user } = useAuth()
    const channels = useSelector((state) => state.channels.channels)
    const messages = useSelector((state) => state.messages.messages)
    console.log(messages)
    return (
    <>
    <Container style={{'width':'1400px'}}>
      <Row className="">
        <Col className="col-2">
            <div>
                <h3 className="mt-4 mb-4">
                    Channels 
                    <a href="/"><AiOutlinePlus/></a>
                </h3>
            </div>
        { channels.map((channel) => (
        <Nav.Item key={channel.id}>
            <Nav.Link className="m-2">
            <DropdownButton
                as={ButtonGroup}
                title={channel.name}
                id="bg-vertical-dropdown-1">
                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                <Dropdown.Item eventKey="2">Rename</Dropdown.Item>
            </DropdownButton>
            </Nav.Link>
        </Nav.Item>
        ))}
        </Col>
        <Col className="col-10">
          <div style={{minHeight: '50vh'}}>
            <ul>
              { messages && messages.map((message) => (
                <li key={message.id}><b>{message.username}: </b>{message.body}</li>
              ))}
            </ul>
            </div>
            <Form
             onSubmit={ (evt) => {
              evt.preventDefault()
              const formData = new FormData(evt.target)
              const body = formData.get("body")
              socket.emit('newMessage', { body: body, channelId: 1, username: user.username });
              // addMessage({ body: body, channelId: 1, username: 'vasya' })
            }}
            >
        <Form.Group
        className="input-group">
          <Form.Control
          name="body"
          placeholder="Write new message..."
          />
          <Button
            type="submit"
            className="btn btn-group-vertical">
            <BsFillSendFill/>
          </Button>
        </Form.Group>
        </Form>
      </Col>
      </Row>

    </Container>
    </>
    )
}
export default ChatPage