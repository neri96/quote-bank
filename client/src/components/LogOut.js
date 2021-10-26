import React from 'react';
import { connect } from 'react-redux';

import { fetchRes } from '../redux/actions';

const LogOut = () => {
    return (
        <div></div>
    )
}

export default connect(
    null,
    { fetchRes }
)(LogOut);