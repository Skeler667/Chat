import { useDispatch, useSelector } from "react-redux"
import { Col, Container, Row, Nav, Form, Button } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth.hook"
import { BsFillSendFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { fetchData } from "../store/slices/fetchData";
import Spinner from 'react-bootstrap/Spinner';

const ChatPage = () => {
    const dispatch = useDispatch()
    const chatApi = useApi();
    const { user, getAuthHeaders } = useAuth()
    const channels = useSelector((state) => state.channels.channels)
    const loading = useSelector((state) => state.channels.loading)
    const messages = useSelector((state) => state.messages.messages)
    useEffect(() => {
      dispatch(fetchData(getAuthHeaders()))
    }, [])
    if ( loading ) {
      return <Spinner/>
    }
    return (
    <>
    <Container style={{'width':'1400px'}}>
      <Row className="">
        <Col className="col-2 border">
            <div>
                <h3 className="mt-5 mb-4">
                    Channels 
                    <a href="#"><AiOutlinePlus/></a>
                </h3>
            </div>
        { channels.map((channel) => (
        <Nav.Item key={channel.id}>
            {/* <Nav.Link className="m-2"> */}
            <div role="group" className="d-flex dropdown btn-group">
              <Dropdown>
              {/* // in Dropdown 
              <Button
                variant="secondary"
                onClick={() => console.log('worked')}
                type="button"
                className={`w-100 rounded-0 text-start text-truncate btn btn-secondary`}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              */}
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {channel.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >Rename</Dropdown.Item>
                  <Dropdown.Item >Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            {/* </Nav.Link> */}
        </Nav.Item>
        ))}
        </Col>
        <Col className="col-10 mt-4">
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># general</b>
            </p>
            <span className="text-muted">{messages.length ? messages.length : 0} messages</span>
          </div>
          <div style={{minHeight: '70vh'}}>
            <ul>
              { messages.map((message) => (
                <li key={message.id}><b>{message.username}: </b>{message.body}</li>
              ))}
            </ul>
            </div>
            <Form
             onSubmit={ (evt) => {
              evt.preventDefault()
              evt.value=''
              const formData = new FormData(evt.target)
              const body = formData.get("body")
              const data = {
                body: body,
                channelId: 1,
                username: user.username
              };
              chatApi.sendMessage(data)
              

            }}
            >
        <Form.Group
        className="input-group">
          <Form.Control
          name="body"
          placeholder="Write new message..."
          autoComplete="off"
          className="mt-auto px-3 py-2"
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