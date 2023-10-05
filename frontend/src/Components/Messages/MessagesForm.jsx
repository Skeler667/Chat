import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { BsFillSendFill } from 'react-icons/bs';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth.hook';

import icon from '../../deployparrot.gif';
import EmojiPicker from 'emoji-picker-react';

const MessagesForm = () => {
  const { user } = useAuth();
  const chatApi = useApi();
  const { currentChannelId } = useSelector((state) => state.channels);
  const inputEl = useRef();
  const { t } = useTranslation();
  const [chosenEmoji, setChosenEmoji] = useState('1');

  useEffect(() => {
    inputEl.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup
        .string()
        .required(),
    }),
    onSubmit: async (values) => {
      const { body } = values;
      const cleanedMessage = leoProfanity.clean(body);
      const messageData = {
        body: cleanedMessage,
        channelId: currentChannelId,
        username: user.username,
      };
      try {
        await chatApi.sendMessage(messageData);
        formik.values.body = '';
        setChosenEmoji('');
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const [isOpen, setOpen] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    const updatedBody = formik.values.body + emojiObject.emoji;
    formik.setFieldValue('body', updatedBody);
    setChosenEmoji('');
};

  return (
    <div className="px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        className="py-1"
      >
        <Form.Group className="input-group has-validation">
          <input
            value={formik.values.body}
            onChange={formik.handleChange}
            aria-label={t('messages.new')}
            className="border-0 p-0 ps-2 form-control"
            name="body"
            ref={inputEl}
            autoFocus
            disabled={formik.isSubmitting}
            placeholder={t('messages.input')}
            autoComplete="off"
            style={{backgroundColor:'#212529', color: '#959cf8', height:'40px', width:'500px'}}
          />
          <Form.Label className="visually-hidden">
            {t('messages.new')}
          </Form.Label>
          <div>
              <img src={icon} alt="" onClick={() => setOpen(!isOpen)} />
                {isOpen && (
                  <div style={{ backgroundColor: 'black'}}>
                    <EmojiPicker 
                    pickerStyle={{
                    position: 'absolute',
                    left: '88%',
                    transform: 'translateX(-50%)',
                    bottom:'120%',
                    }}
                    disableSearchBar={true}
                    onEmojiClick={onEmojiClick}
                    />
                  </div>
                )}
            </div>
          <Button
            type="submit"
            onClick={() => setOpen(false)}
            disabled={!formik.values.body}
            className="btn-dark btn-group-vertical btn-outline-info"
          >
            <BsFillSendFill />
            <span className="visually-hidden">
              {t('messages.send')}
            </span>
          </Button>
        </Form.Group>
      </Form>
      
    </div>
  );
};

export default MessagesForm;
