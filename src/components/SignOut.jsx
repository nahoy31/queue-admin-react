import React from 'react';
import { Redirect } from 'react-router'

class SignOut extends React.Component {

    componentDidMount() {
        window.localStorage.removeItem('access_token');
    }

    renderRedirect() {
        return <Redirect to='/signin/' />
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
            </div>
        )
    }
}

export default SignOut;