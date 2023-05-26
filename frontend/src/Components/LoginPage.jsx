import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container, Button, Form, Row, Col, FloatingLabel, FormText,
} from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../hooks/useAuth.hook';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const { logIn } = useAuth();

  const SignupSchema = Yup.object().shape({
    username: Yup
      .string()
      .required(t('login.validation.required')),
    password: Yup
      .string()
      .required(t('login.validation.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        logIn(response.data);
        navigate('/');
      } catch (error) {
        const { statusText } = error.response;
        const message = statusText === 'Unauthorized' && 'login.validation.failed';
        setAuthError(message);
      }
    },
    validationSchema: SignupSchema,
  });
  return (
    <Container>
      <Row>
        <Col className="mt-5 text-center mx-auto" md={6}>
          <h1 className="text-center">{t('login.title')}</h1>
          <Form onSubmit={formik.handleSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel label={t('login.username')}>
                <Form.Control
                  autoComplete="off"
                  name="username"
                  value={formik.values.username}
                  onBlur={formik.handleBlur('username')}
                  onChange={formik.handleChange}
                  className={formik.errors.username && formik.touched.username ? 'is-invalid' : ''}
                  type="text"
                />
              </FloatingLabel>
              {
                formik.errors.username
                && formik.touched.username
                && <FormText className="feedback text-danger mt-3">{t(formik.errors.username)}</FormText>
              }
              <FormText className="feedback text-danger mt-3">{authError}</FormText>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel label={t('login.password')}>
                <Form.Control
                  autoComplete="off"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur('username')}
                  onChange={formik.handleChange}
                  type="password"
                  className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''}
                />
              </FloatingLabel>
              {
                  formik.errors.password
                  && formik.touched.password
                  && <FormText className="feedback text-danger mt-3">{t(formik.errors.password)}</FormText>
                }
              <FormText className="feedback text-danger mt-3">{authError}</FormText>

            </Form.Group>
            <div className="d-grid gap-2">
              <Button size="lg" variant="primary" type="submit">
                {t('login.submit')}
              </Button>
              <p className="mt-3">
                {t('login.hasAccount')}
                <Link style={{ marginLeft: 5 }} to="/signup">{t('signup.title')}</Link>
              </p>
            </div>
          </Form>
        </Col>

      </Row>
    </Container>
  );
};
export default LoginPage;
