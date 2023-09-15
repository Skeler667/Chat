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
        .min(3, 'addModal.validation.length')
        .notOneOf(channels.map((channel) => channel.name), 'addModal.validation.unique')
        .required('addModal.validation.required'),
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
        toast.success(t('addModal.success'), {
        icon: '🚀',
        theme: "dark",
      });
      } catch (err) {
        toast.error(t('errors.unknown'), { 
        icon: '🚩',
        theme: "dark",
      });
        console.error(err);
      }
    },
  });

  return (
    <Modal show variant='dark'>
      <Modal.Header className='border-0' style={{backgroundColor: '#212529', color: '#959cf8'}} closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('addModal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:'black'}}>
        <Form onSubmit={formik.handleSubmit} style={{backgroundColor:'black'}}>
          <Form.Group className="mb-3">
            <Form.Control
              value={formik.values.name}
              className='border-0 p-0 ps-2 form-control'
              onChange={formik.handleChange}
              ref={inputEl}
              name="name"
              type="text"
              autoFocus
              autoComplete="off"
              isInvalid={formik.errors.name && formik.touched.name}
              style={{backgroundColor: '#212529', color: '#959cf8'}}
            />
            {
              formik.errors.name
              && formik.touched.name
              && <FormText className="feedback text-danger mt-3">{t(formik.errors.name)}</FormText>
            }
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('addModal.channelName')}
            </Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-between" style={{backgroundColor:'black'}}>
            <Button
              role="button"
              className="m-1"
              variant="outline-secondary"
              onClick={() => dispatch(hideModal())}
            >
              {t('addModal.cancel')}
            </Button>
            <Button
              role="button"
              className="m-1"
              variant="outline-info"
              type="submit"
            >
              {t('addModal.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
