import React, { useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';

import { quoteId, quoteText } from '../../redux/actions';

import './Menu.scss';

const Menu = ({ menuVis, handleMenu, quoteId, id, quoteText, setData }) => {
    const outside = useRef(null);

    const closeMenu = (e) => {
        if(outside.current && !outside.current.contains(e.target)) {
            handleMenu();
        } 
    }

    useEffect(() => {
        document.addEventListener("click", closeMenu, false);
        return () => {
          document.removeEventListener("click", closeMenu, false);
        };
    }, [closeMenu]);

    return (
        <CSSTransition
            in={menuVis}
            mountOnEnter
            unmountOnExit
            timeout={300}
            classNames="menu-anim"
        >
            <div className='menu' ref={outside} onClick={setData}>
                <EditBtn />
                <DeleteBtn />
            </div>
        </CSSTransition>
    )
}

export default connect(
    null,
    { quoteId, quoteText }
)(Menu);