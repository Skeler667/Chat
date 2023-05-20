import React from 'react'
import { useTranslation } from 'react-i18next';
import { Col, Form, Button } from "react-bootstrap"
import { useSelector } from 'react-redux'
import useApi from "../hooks/useApi";
import { BsFillSendFill } from 'react-icons/bs';
import { useAuth } from './../hooks/useAuth.hook';

const Messages = () => {
    const { t } = useTranslation();
    const { user } = useAuth()
    const chatApi = useApi()
    const channels = useSelector((state) => state.channels.channels)
    const messages = useSelector((state) => state.messages.messages)
    const currentIdChannel = useSelector((state) => state.channels.currentChannelId)
    const currentChannel = channels.find((channel) => channel.id === currentIdChannel)
    const currentMessages = messages.filter((message) => message.currentChannelId === currentIdChannel)
    const count = currentMessages.length

  return (
    <Col className="col-10 mt-4" >
    <div  className="bg-light mb-4 p-3 shadow p-3 small">
        <p className="m-0">
            <b># { currentChannel ? currentChannel.name : 'LOADING'}</b>
        </p>
        <span className="text-muted">{t('messagesCount.key', { count })}</span>
      </div>
      <div style={{minHeight: '70vh'}}>
        <ul style={{overflowY:'auto', height:'600px', listStyleType: 'none'}}>
          { currentMessages.map((message) => (
            <li key={message.id}><b>{message.username}: </b>{message.body}</li>
          ))}
        </ul>
        </div>
        <Form
         onSubmit={ (evt) => {
          evt.preventDefault()
          const formData = new FormData(evt.target)
          const body = formData.get("body")
          const data = {
            body: body,
            currentChannelId: currentIdChannel,
            username: user.username
          };
          chatApi.sendMessage(data)
          evt.target.reset();

        }}
        >
    <Form.Group
    className="input-group">
      <Form.Control
      name="body"
      placeholder={t('messages.input')}
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
  )
}

export default Messages