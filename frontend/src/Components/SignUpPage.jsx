import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Container, Button, Form, FloatingLabel, FormText } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.hook';
import { Link, useNavigate } from "react-router-dom";

 const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [signUpError, setSignUpError] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'signup.validation.usernameLength')
      .max(20, 'signup.validation.usernameLength')
      .required('signup.validation.required')
      .label("Name"),
    password: Yup.string()
      .required('signup.validation.required')
      .min(5, 'signup.validation.passwordLength')
      .label("Password"),
    confirmPassword: Yup.string()
      .required('signup.validation.required')
      .max(8)
      .label("Confirm Password")
      .oneOf([Yup.ref("password"), null], 'signup.validation.mustMatch'),
  });

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
            console.log(response.data)
            logIn(response.data)
            navigate('/')
          } catch (error) {
            const { status } = error.response;
            const message = status === 409 && 'signup.validation.alreadyExists';
            setSignUpError(message);
          }
        },
      });
      
   return (
    <Container>
        <Row>
        <h1 className="text-center mt-4">{t('signup.title')}</h1>   
        <Col style={{'margin': '0 auto'}} className='col-6 mt-3 align-items-center '>
        <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <FloatingLabel label={t('signup.username')}>
        <Form.Control
            autoComplete='off'
            id="name"
            type="text"
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            />
            </FloatingLabel>
        {formik.errors.name && formik.touched.name && (<Form.Text className='text-danger'>{t(formik.errors.username)}</Form.Text>)}
      </Form.Group>

      <Form.Group className="mb-3">
      <FloatingLabel label={t('signup.password')}>
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
            {formik.errors.password && formik.touched.password && (<Form.Text className='text-danger'>{t(formik.errors.password)}</Form.Text>)}
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel label={t('signup.confirmPassword')}>
        <Form.Control
            autoComplete='off'
            id="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur("confirmPassword")}
            onChange={formik.handleChange("confirmPassword")}
            />
            </FloatingLabel>
            {
                  (formik.errors.confirmPassword
                    && formik.touched.confirmPassword
                    && <FormText className="feedback text-danger mt-3">{t(formik.errors.confirmPassword)}</FormText>)
                    || <FormText className="feedback text-danger mt-3">{t(signUpError)}</FormText>
                }
      </Form.Group>

      <div className="d-grid gap-2">
      <Button size="lg" variant="primary" type="submit">
      {t('signup.submit')}
      </Button>
      <p className="mt-3">
            {t('signup.hasAccount')}
            <Link style={{ marginLeft: 5 }} to="/login">{t('login.title')}</Link>
          </p>
      </div>
    </Form>
        </Col>
      </Row>
    
     </Container>
   );
 };

 export default SignUpPage