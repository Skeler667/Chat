import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Form, FloatingLabel } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.hook';
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required')
      .label("Name"),
    password: Yup.string()
      .required()
      .min(4, 'Too Short!')
      .max(12, 'Too Long!')
      .label("Password"),
    confirmPassword: Yup.string()
      .required()
      .max(8)
      .label("Confirm Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

 const SignUpPage = () => {
  const navigate = useNavigate()
  const { logIn, user } = useAuth()
  const [authError, setAuthError] = useState(null);
    const formik = useFormik({
        initialValues: {
          name: "",
          password: "",
          confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          try {
            const userData = {
              username: values.name,
              password: values.password
            }
            const response = await axios.post('/api/v1/signup', userData)
            // setUsername(response.data.username)
            console.log(response.data)
            logIn(response.data)
            navigate('/')
          } catch (error) {
            // setAuthError(error.response.statusText)
            console.log(authError)
          }
        },
      });
      
   return (
    <Container>
        <Row>
        <h1 className="text-center mt-4">Registration</h1>   
        <Col style={{'margin': '0 auto'}} className='col-6 mt-3 align-items-center '>
        <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <FloatingLabel label='Enter name'>
        <Form.Control
            autoComplete='off'
            id="name"
            type="text"
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            onChange={formik.handleChange("name")}/>
            </FloatingLabel>
        {formik.errors.name && formik.touched.name && (<Form.Text className='text-danger'>{formik.errors.name}</Form.Text>)}
      </Form.Group>

      <Form.Group className="mb-3">
      <FloatingLabel label='Password'>
        <Form.Control 
            autoComplete='off'
            name='password'
            id="password"
            type="password"
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
            onChange={formik.handleChange("password")}
             />
             </FloatingLabel>
            {formik.errors.password && formik.touched.password && (<Form.Text className='text-danger'>{formik.errors.password}</Form.Text>)}
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel label='Confirm password'>
        <Form.Control
            autoComplete='off'
            id="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur("confirmPassword")}
            onChange={formik.handleChange("confirmPassword")}
            />
            </FloatingLabel>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (<Form.Text className='text-danger'>{formik.errors.confirmPassword}</Form.Text>)}
      </Form.Group>

      <div className="d-grid gap-2">
      <Button size="lg" variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
        </Col>
      </Row>
    
     </Container>
   );
 };

 export default SignUpPage