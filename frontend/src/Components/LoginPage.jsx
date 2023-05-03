import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';

const SignupSchema = Yup.object().shape({
    login: Yup.string()
      .min(4, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema: SignupSchema
  })
    return (
      <Container>
        <Row>
          <Col className="mt-5" md={6} style={{'margin': '0 auto'}} >
          <h1 className="text-center">Authorization</h1>
      <Form onSubmit={formik.handleSubmit} className='mt-4'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel label='Login'>
        <Form.Control autoComplete='off' name="login" value={formik.values.login} onChange={formik.handleChange} type="text" placeholder="Enter login" />
        </FloatingLabel>
        {formik.errors.login && formik.touched.login && (<Form.Text className='text-danger'>{formik.errors.login}</Form.Text>)}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword"> 
      <FloatingLabel label='Password'>
        <Form.Control autoComplete='off' name="password" value={formik.values.password} onChange={formik.handleChange} type="password" placeholder="Password" />
        </FloatingLabel>
        {formik.errors.password && formik.touched.password && (<Form.Text className='text-danger'>{formik.errors.password}</Form.Text>) }
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
    )
}
export default LoginPage