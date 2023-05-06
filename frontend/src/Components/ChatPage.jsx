import { useSelector } from "react-redux"
import Header from "./Header"
import { Col, Container, Row, Nav, Form, Button } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth.hook"
// import { BsFillSendFill } from "react-icons"
import { BsFillSendFill } from 'react-icons/bs';
const ChatPage = () => {
    const { username } = useAuth()
    console.log(username)
    const channels = useSelector((state) => state.channels.channels)
    console.log(channels)
    const messages = useSelector((state) => state.messages)
    console.log(messages)
    return (
        //<Form.Control placeholder="Send n5d9s" />
    <>
    <Header />
    
    <Container style={{'width':'900px'}}>

      <Row className="">
        <Col className="col-2">
        { channels.map((channel) => (
        <Nav.Item as="li" key={channel.id}>
            <Nav.Link >{channel.name}</Nav.Link>
        </Nav.Item>
        ))}
        </Col>
        <Col className="col-10">
            <ul></ul>
            <div>
        <Form.Control 
        placeholder="write message"
        type="text"
       />
       <Button variant="outline-primary"><BsFillSendFill/></Button>
       </div>
      </Col>
      </Row>
    </Container>
    </>
    )
}
export default ChatPage