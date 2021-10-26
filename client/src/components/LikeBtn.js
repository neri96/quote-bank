import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCrud, setModalVis, resClear } from '../redux/actions';


const Like = ({ 
    fetchCrud, 
    quoteId, 
    userId, 
    likes, 
    setModalVis
}) => {
    const [liked, setLiked] = useState(false);
    const [lastClick, setLastClick] = useState(0);

    useEffect(() => {
        // const idFound = likes.find(id => id === userId);
        const idFound = likes.indexOf(userId);

        idFound > -1 ? setLiked(true) : setLiked(false);
    }, [userId, likes])

    const likeQuote = () => {
        if (Date.now() - lastClick < 1500) return;
        setLastClick(Date.now());

        fetchCrud(
            'PATCH',
            `quote/like/${quoteId}`,
            null
        );
    }

    if(liked) {
        return (
            <div className='quote-likes'>
                <img 
                    src={require('../images/like-active.svg').default} 
                    alt='like'
                    onClick={likeQuote} 
                />
                <span>{likes.length}</span>
            </div>
        )
    } else if(!userId) {
        return (
            <div className='quote-likes'>
                <img 
                    src={require('../images/like.svg').default} 
                    alt='like'
                    onClick={() => setModalVis({ signIn: true })} 
                />
                <span>{likes.length}</span>
            </div>
        )
    } else if(!liked) {
        return (
            <div className='quote-likes'>
                <img 
                    src={require('../images/like.svg').default} 
                    alt='like'
                    onClick={likeQuote} 
                />
                <span>{likes.length}</span>
            </div>
        )
    } 
}


export default connect(
    null,
    { fetchCrud, setModalVis, resClear }
)(Like);