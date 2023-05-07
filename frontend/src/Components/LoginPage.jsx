import  React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { setChannels } from '../store/slices/channelSlice';
import { setMessages } from '../store/slices/messagesSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth.hook';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
      .min(4, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(null);
  const { logIn, setUsername } = useAuth()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values)
        logIn(response.data.token)
        setUsername(response.data.username)
        navigate('/')
      } catch (error) {
        setAuthError(error.response.statusText)
        console.log(error.response.statusText)
      }
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('user')
          }})
        const data = await response.data
          dispatch(setChannels(data.channels))
          dispatch(setMessages(data.messages))
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    validationSchema: SignupSchema,
  })
    return (
      <Container>
        <Row>
          <Col className="mt-5" md={6} style={{'margin': '0 auto'}} >
          <h1 className="text-center">Authorization</h1>
      <Form onSubmit={formik.handleSubmit} className='mt-4'>
      <Form.Group className="mb-3" controlId="formBasicName">
        <FloatingLabel label='Username'>
        <Form.Control autoComplete='off' name="username" value={formik.values.username} onBlur={formik.handleBlur("username")} onChange={formik.handleChange} type="text" placeholder="Enter login" />
        </FloatingLabel>
        {formik.errors.username && formik.touched.username && (<Form.Text className='text-danger'>{formik.errors.username}</Form.Text>)}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword"> 
      <FloatingLabel label='Password'>
        <Form.Control autoComplete='off' name="password" value={formik.values.password} onBlur={formik.handleBlur("password")}  onChange={formik.handleChange} type="password" placeholder="Password" />
        </FloatingLabel>
        {formik.errors.password && formik.touched.password && (<Form.Text className='text-danger'>{formik.errors.password}</Form.Text>) }
        <Form.Text className='text-danger'>
          {authError ? 'Ошибка авторизации': null }
        </ Form.Text>
      </Form.Group>
      <div className="d-grid gap-2">
      <Button size="lg" variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
      <h5 className='mt-3'>Don't have account? <a href="/signup">Register now</a></h5>
    </Col>
    
    </Row>
    </Container>
    )
}
export default LoginPage