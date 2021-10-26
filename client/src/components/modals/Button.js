import React from 'react';

import './Button.scss';

const Button = (props) => {
    switch (props.type) {
        case 'button':
            return (
                <button 
                    type='button'
                    className='btn'
                    onClick={props.handleForm}
                >
                    {props.children}
                </button>
            )
        case 'submit':
            return (
                <button 
                    type='button' 
                    className='btn submit'
                    onClick={props.handleSubmit}
                >
                    {props.children}
                </button>
            )
        case 'confirm':
            return (
                <button 
                    type='button' 
                    className='btn confirm'
                    onClick={props.closeModal}
                >
                    {props.children}
                </button>
            )
        default:
            break;
    }
}

export default Button;

