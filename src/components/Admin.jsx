import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

class Admin extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div id="content">

                </div>
                <Footer />
            </div>
        );
    }
}

export default Admin;