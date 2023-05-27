import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Form, Button, Modal, FormText,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../../store/slices/modalsSlice';
import { setCurrentChannelId } from '../../store/slices/channelSlice';
import useApi from '../../hooks/useApi';

const AddModal = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chatApi = useApi();
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, 'Минимум 3 символа')
        .notOneOf(channels.map((channel) => channel.name), 'addModal.validation.unique')
        .required('Обязательное поле'),
    }),

    onSubmit: async (values) => {
      const channelData = {
        name: values.name,
        removable: true,
      };

      try {
        const response = await chatApi.addChannel(channelData);
        dispatch(setCurrentChannelId(response.id));
        dispatch(hideModal());
        toast.success(t('addModal.success'), { icon: '🚀' });
      } catch (err) {
        toast.error(t('errors.unknown'), { icon: '🚩' });
        console.error(err);
      }
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('addModal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputEl}
              name="name"
              type="text"
              autoFocus
              autoComplete="off"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            {
              formik.errors.name
              && formik.touched.name
              && <FormText className="feedback text-danger mt-3">{t(formik.errors.name)}</FormText>
            }
            <Form.Label className="visually-hidden" for="name">
              {t('addModal.channelName')}
            </Form.Label>
          </Form.Group>
          <Button
            role="button"
            className="m-1"
            variant="secondary"
            onClick={() => dispatch(hideModal())}
          >
            {t('addModal.cancel')}
          </Button>
          <Button
            role="button"
            className="m-1"
            variant="primary"
            type="submit"
          >
            {t('addModal.send')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
