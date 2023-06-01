import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Dropdown, ButtonGroup, Nav,
} from 'react-bootstrap';
import cn from 'classnames';
import { setCurrentChannelId } from '../store/slices/channelSlice';
import { showModal } from '../store/slices/modalsSlice';

const Channels = () => {
  const currentIdChannel = useSelector((state) => state.channels.currentChannelId);
  const scrollTrigger = useRef();
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    scrollTrigger.current.scrollIntoView({
      behaivor: 'smooth',
    });
  });
  const { t } = useTranslation();
  const changeChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>
          {t('channels.title')}
        </b>
        <button
          onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">
            {t('channels.plus')}
          </span>
        </button>
      </div>

      <div className="overflow-auto" style={{ height: '78vh' }}>
        { channels.map((channel) => {
          const style = cn('btn', {
            'btn-secondary': channel.id === currentIdChannel,
          });
          return channel.removable
            ? (
              <Nav.Item key={channel.id}>
                <div role="group" className="nav flex-column nav-pills nav-fill px-2 h-100 d-block">
                  <Dropdown as={ButtonGroup} className="w-100">
                    <button onClick={() => changeChannel(channel.id)} className={`w-100 rounded-0 text-start text-truncate btn ${style}`} type="button">
                      <span className="me-1">#</span>
                      {channel.name}
                    </button>

                    <Dropdown.Toggle split variant="light" className={`${style}`} id="dropdown-split-basic">
                      <span className="visually-hidden">{t('renameModal.handlingChannel')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => dispatch(showModal({ modalType: 'renaming', channelId: channel.id }))}
                      >
                        {t('channels.rename')}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => dispatch(showModal({ modalType: 'removing', channelId: channel.id }))}
                      >
                        {t('channels.remove')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Nav.Item>
            )
            : (
              <Nav.Item key={channel.id}>
                <button type="button" onClick={() => changeChannel(channel.id)} className={`w-100 rounded-0 text-start ${style}`}>
                  #
                  {' '}
                  {channel.name}
                </button>
              </Nav.Item>
            );
        })}
        <span ref={scrollTrigger} />
      </div>
    </Col>
  );
};

export default Channels;
