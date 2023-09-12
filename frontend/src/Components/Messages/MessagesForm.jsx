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

import icon from '../../deployparrot.gif'
import EmojiPicker from 'emoji-picker-react';



const MessagesForm = () => {
  const { user } = useAuth();
  const chatApi = useApi();
  const { currentChannelId } = useSelector((state) => state.channels);
  const inputEl = useRef();
  const { t } = useTranslation();

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
        setChosenEmoji('')
        formik.resetForm();
        
      } catch (error) {
        console.error(error);
      }
    },
  });

  const [isOpen, setOpen] = useState(false);
  // const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

const [chosenEmoji, setChosenEmoji] = useState('1');
  const onEmojiClick = (event, emojiObject) => { 
    // setChosenEmoji(emojiObject.emoji)
    console.log(emojiObject.emoji)
    setChosenEmoji(...formik.values.body += emojiObject.emoji)
    formik.setFieldValue('formik.values.body', chosenEmoji, false) 
    console.log(`current emoji: ${emojiObject.emoji}\n formik.values.body: ${formik.values.body}\n chosenEmoji: ${emojiObject.emoji}`)
    setChosenEmoji('')
  };

  return (
    <div className="px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        className="py-1 border rounded-2"
      >
        <Form.Group className="input-group has-validation">
          <Form.Control
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
          />
          <Form.Label className="visually-hidden">
            {t('messages.new')}
          </Form.Label>
          <Button
            type="submit"
            disabled={!formik.values.body}
            className="btn btn-group-vertical"
          >
            <BsFillSendFill />
            <span className="visually-hidden">
              {t('messages.send')}
            </span>
          </Button>
        </Form.Group>
      </Form>
      <span>

<img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

  {isOpen && (
    <div>
      <EmojiPicker preload onEmojiClick={onEmojiClick} />
    </div>
  )}
</span>
    </div>
  );
};

export default MessagesForm;
