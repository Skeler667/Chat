import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { Nav } from "react-bootstrap"
import { setCurrentChannelId } from '../store/slices/channelSlice';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { showModal } from '../store/slices/modalsSlice';

const Channels = () => {

    const channels = useSelector((state) => state.channels.channels)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const currentIdChannel = useSelector((state) => state.channels.currentChannelId)
    const changeChannel = (id) => {
      dispatch(setCurrentChannelId(id))
    }
    return (
        <Col className="col-2 border">
        <div>
            <h3 className="mt-5 mb-4">
                <b>{t('channels.title')}</b> 
                <button  onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}  style={{border:'0', marginLeft:'40px'}}>
                  <BsFillPlusSquareFill/>
                  </button>
            </h3>
        </div>
    { channels.map((channel) => {

        const style = cn('btn', {
          'btn-secondary': channel.id === currentIdChannel,
        });
      
     return channel.removable ?  
    <Nav.Item key={channel.id}>
        <div role="group" className="d-flex dropdown btn-group">
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
    : 
    <Nav.Item key={channel.id}>
    <button onClick={() => changeChannel(channel.id)} className={`w-100 rounded-0 text-start ${style}`}>
      # {channel.name}
      </button>
    </Nav.Item>
    })}
    </Col>
    )
}

export default Channels