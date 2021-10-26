import React, { useState, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { HuePicker } from 'react-color';

import Overlay from './modals/Overlay';
import Modal from './modals/Modal';
import Button from './modals/Button';

import { ModalContext } from '../context/ModalContext';

import './NewQuote.scss';

const NewQuote = () => {
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

    const { newQuote } = modalVis;

    const closeModal = () => {
        setModalVis({ ...modalVis, newQuote: !newQuote });
    } 

    const header = () => {
        return <img src={require('../images/quote-form.svg')} alt='logo' />
    }

    const footer = () => {
        return (
            <React.Fragment>
                <Button type='button' handleForm={closeModal}>
                    Cancel
                </Button>
                
                <Button type='submit'>
                    Post
                </Button>
            </React.Fragment>
        )
    }

    console.log(color);

    return (
            <React.Fragment>
                { newQuote && <Overlay closeModal={closeModal} /> }

                <CSSTransition
                    in={newQuote}
                    mountOnEnter
                    unmountOnExit
                    timeout={300}
                    classNames="new-quote"
                >
                    <Modal
                        type='quote-ops' 
                        header={header()}
                        footer={footer()}
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
                    </Modal>
                </CSSTransition>
            </React.Fragment> 
    )
}

export default NewQuote;