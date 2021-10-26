import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';
import { HuePicker } from 'react-color';

import Overlay from './modals/Overlay';
import Modal from './modals/Modal';
import Button from './modals/Button';

import { ModalContext } from '../context/ModalContext';

import './Modal.scss';

const QuoteModal = (props) => {
    const { component, footer } = props;

    const [color, setColor] = useState('#ccc');
    const [font, setFont] = useState({
        style: 'normal',
        weight: '400'
    })

    const currentFont = (e) => {
        const val = e.target.value.split(' ');

        if(val.length > 1) {
            setFont({ ...font, style: val[0], weight: val[1] })
        } else {
            setFont({ ...font, style: val[0], weight: 400 })
        }
    }

    const { modalVis, setModalVis } = useContext(ModalContext);

    const { type } = modalVis;

    const closeModal = () => {
        setModalVis({ ...modalVis, newQuote: !newQuote });
    } 

    return ReactDOM.createPortal(
        <div className={`modal ${!props.children && 'delete'} 'quote-ops'`}>
            <div className='modal-header'>  
                <img src={require('../images/quote-form.svg')} alt='logo' />
            </div>

            <div className='modal-body'>
                <form onSubmit={props.handleSubmit}>
                    <React.Fragment>
                    { component && <Overlay closeModal={closeModal} /> }

                    <CSSTransition
                        in={component}
                        mountOnEnter
                        unmountOnExit
                        timeout={300}
                        classNames="new-quote"
                    >
                    
                            <div className='quote-modal'>
                                <div className='quote-text-modal'>
                                    <textarea style={{ 
                                        color, 
                                        fontStyle: font.style, 
                                        fontWeight: font.weight 
                                    }}></textarea>
                                </div>

                                <div className='color-picker'>
                                    <span>Pick text color</span>
                                    <HuePicker
                                        color={color}
                                        onChangeComplete={(color) => setColor(color.hex)}
                                    />
                                </div>

                                <div className='font-picker'>
                                    <span>Pick text font</span>
                                    <select onChange={currentFont}>
                                        <option defaultValue value='normal'>Normal</option>
                                        <option value='italic'>Italic</option>
                                        <option value='normal 700'>Normal bold</option>
                                        <option value='italic 700'>Italic bold</option>
                                    </select>
                                </div>
                            </div>
                    </CSSTransition>
                </React.Fragment> 
                </form>
            </div>

            <div className='modal-footer'>
                {footer}
            </div>
        </div>,
        document.querySelector('#modal-window')
    )
};

export default QuoteModal;