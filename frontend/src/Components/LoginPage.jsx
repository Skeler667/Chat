import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container, Button, Form, Row, Col, FormText,
} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import useAuth from '../hooks/useAuth.hook';
import routes from '../utils/routes';
import { setLogin } from '../utils/api';

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
        const response = await setLogin(values);
        logIn(response.data);
        navigate(routes.home);
      } catch (error) {
        const { statusText } = error.response;
        const message = statusText === 'Unauthorized' && 'login.validation.failed';
        setAuthError(message);
      }
    },
    validationSchema: SignupSchema,
  });
  return (
    <Container className='mt-4' style={{backgroundColor:'black', color:'#959cf8'}}>
      <Row>
        <Col className="col-9 m-auto mt-5">
          <h1 className="text-center">{t('login.title')}</h1>
          <Form
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.username}
                onChange={formik.handleChange}
                type="text"
                id="floatingLogin"
                name="username"
                disabled={formik.isSubmitting}
                placeholder={t('login.username')}
                autoComplete="off"
                style={{backgroundColor: '#212529', color: '#959cf8'}}
                className={formik.errors.username && formik.touched.username ? 'is-invalid' : 'border-0'}
              />
              <Form.Label htmlFor="floatingLogin">{t('login.username')}</Form.Label>
              {
              formik.errors.username
              && formik.touched.username
              && <FormText className="feedback text-danger mt-3">{t(formik.errors.username)}</FormText>
            }

            </Form.Group>
            <Form.Group className="mb-3 form-floating">
              <Form.Control
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                id="floatingPassword"
                name="password"
                autoComplete="off"
                disabled={formik.isSubmitting}
                placeholder={t('login.password')}
                style={{backgroundColor: '#212529', color: '#959cf8'}}
                className={formik.errors.password && formik.touched.password ? 'is-invalid' : 'border-0'}
              />
              <Form.Label htmlFor="floatingPassword">{t('login.password')}</Form.Label>
              {
                formik.errors.password
                && formik.touched.password
                && <FormText className="feedback text-danger mt-3">{t(formik.errors.password)}</FormText>
              }
              <FormText className="feedback text-danger mt-3">{t(authError)}</FormText>
            </Form.Group>
            <Button
              disabled={formik.isSubmitting}
              variant="outline-info"
              type="submit"
            >
              {formik.isSubmitting && <Spinner size="sm" />}
              {t('login.submit')}
            </Button>
          </Form>
          <p className="mt-3">
            {t('login.hasAccount')}
            <Link style={{ marginLeft: 5 }} to={routes.signup}>{t('signup.title')}</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
