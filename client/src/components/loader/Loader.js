import React from 'react';

import './Loader.scss';

const Loader = () => {
    return (  
        <div className='loading'>
            <img src={require('../../images/spinner.svg')} alt='loading...' />
        </div>
    )
}
 
export default Loader;