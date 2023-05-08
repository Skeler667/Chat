import { useSelector } from "react-redux"
import Header from "./Header"
import { Col, Container, Row, Nav, Form, Button } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth.hook"
import { BsFillSendFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ChatPage = () => {
    const { username } = useAuth()
    const channels = useSelector((state) => state.channels.channels)
    const objectMessages = useSelector((state) => state.messages)
    const messages = Object.keys(objectMessages)
    return (
    <>
    <Header />
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
            <ul>
              { messages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
        <Form.Group className="input-group">
          <Form.Control
          placeholder="Write new message..."
          />
          <Button
            type="submit"
            className="btn btn-group-vertical">
            <BsFillSendFill/>
          </Button>
        </Form.Group>
      </Col>
      </Row>

    </Container>
    </>
    )
}
export default ChatPage