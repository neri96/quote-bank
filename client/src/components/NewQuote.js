import React, { useState, useEffect, useCallback } from 'react';
import isEmpty from 'lodash.isempty';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { HuePicker } from 'react-color';

import Overlay from './modals/Overlay';
import Modal from './modals/Modal';
import Button from './modals/Button';

import { fetchCrud, resClear, setModalVis } from '../redux/actions';

import './NewQuote.scss';

const NewQuote = ({ fetchCrud, errorMsg, resClear, setModalVis, modalVis }) => {
    const [color, setColor] = useState('#ccc');
    const [font, setFont] = useState({
        style: 'normal',
        weight: '400'
    });

    const [text, setText] = useState('');

    const { newQuote } = modalVis;

    const currentFont = (e) => {
        const val = e.target.value.split(' ');

        if(val.length > 1) {
            setFont({ ...font, style: val[0], weight: val[1] })
        } else {
            setFont({ ...font, style: val[0], weight: 400 })
        }
    };

    const closeModal = () => {
        setModalVis({ newQuote: false });
        setText('');
    };

    const handleSubmit = async () => {
        await fetchCrud(
            'POST',
            'quote/new',
            { text, color, font }
        )
    };

    const footer = () => {
        return (
            <React.Fragment>
                <Button type='button' handleForm={closeModal}>
                    Cancel
                </Button>
                
                <Button type='submit' handleSubmit={handleSubmit}>
                    Post
                </Button>
            </React.Fragment>
        )
    }

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
                        header={<img src={require('../images/quote-form.svg').default} alt='logo' />}
                        footer={footer}
                        closeModal={closeModal}
                    >
                        
                            <div className='quote-text-modal'>
                                <textarea 
                                    style={{ 
                                        color, 
                                        fontStyle: font.style, 
                                        fontWeight: font.weight 
                                    }}
                                    name='textarea'
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                ></textarea>
                            </div>

                            <div className='color-picker'>
                                <span>Pick text color</span>
                                <HuePicker
                                    width={'290px'}
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
                    </Modal>
                </CSSTransition>
            </React.Fragment> 
    )
}

const mapStateToProps = (state) => {
    return {
        errorMsg: state.errorMsg,
        modalVis: state.modalVis
    }
}

export default connect(
    mapStateToProps,
    { fetchCrud, resClear, setModalVis }
)(NewQuote);