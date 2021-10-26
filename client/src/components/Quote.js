import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';

import { connect } from 'react-redux';

import { quoteText, quoteId } from '../redux/actions';

import Menu from './menu/Menu';
import LikeBtn from './LikeBtn';

const Quote = ({ quote, quoteText, setQuoteId, quoteIdState, cookies, userId, quoteTextS }) => {
    const [menuVis, setMenuVis] = useState(false);

    // useEffect(() => {
    //     if(quoteIdState === quote._id) {
    //         quoteText(quote.text);
    //     }
    //     // Everytime a user opens menu, the id reducer changes to an id of quote which menu was opened and quoteIdState has that id. Then, text reducer receives a text of a chosen quote. Once user click on 'edit' button, the text displays inside the field.
    // }, [quoteIdState, quoteTextS]);

    // useEffect(() => {
    //     const userIdStorage = localStorage.getItem('userId');

    //     if(userIdStorage && !userId) {
    //         setUserId(localStorage.getItem('userId'));
    //     } else if(!userIdStorage && userId) {
    //         setUserId(null);
    //     }
    // }, [userId, localStorage, cookies.get('access_token')]);

    // useEffect(() => {
    //     userId ? setAuthorId(quote.author._id) : setAuthorId(null);
    // }, [userId, quote.author._id])

    const handleMenu = () => {
        setMenuVis(!menuVis);        
    }

    const setData = () => {
        setQuoteId(quote._id);
        quoteText(quote.text);
    }

    return (
            <div className='quote-wrap'>
                <div className='quote'>
                    <div className='quote-body' style={{ backgroundImage: `url(${require(`../images/quote-bg/${quote.bgImg}`).default})` }}>
                        { userId === quote.author._id ?
                            <React.Fragment>
                                <div className='q-menu-img'>
                                    <img 
                                        src={require('../images/q-menu.svg').default} 
                                        alt='q-menu' 
                                        onClick={handleMenu}             
                                    />
                                </div>
                                <Menu 
                                    menuVis={menuVis} 
                                    handleMenu={handleMenu}
                                    setData={setData}
                                    id={quote._id} 
                                    text={quote.text}    
                                />
                            </React.Fragment>
                            : <div className='q-menu-img'></div>
                        }
                        <div className={`quote-text ${quote.text.length > 252 && 'long'}`}>
                            <h3 
                                style={{ 
                                    color: quote.styles.color,
                                    fontStyle: quote.styles.font.style,
                                    fontWeight: quote.styles.font.weight,
                                }}
                                >
                                    {quote.text}
                            </h3>
                        </div>
                    </div>

                    <div className='quote-footer'>
                        <div className='quote-author'>
                            <span>{quote.author.name}</span>
                        </div>

                        <LikeBtn 
                            quoteId={quote._id}
                            userId={userId} 
                            likes={quote.likes} 
                        />
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        quoteIdState: state.id,
        quoteTextS: state.quoteTextR,
        userId: state.userId
    }
}

export default connect(
    mapStateToProps,
    { quoteText, setQuoteId: quoteId }
)(withCookies(Quote));