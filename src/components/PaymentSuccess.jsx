import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageAppBar from './layout/PageAppBar.jsx'

class PaymentSuccess extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //
        };
    }

    componentDidMount() {
        //
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline />
                <Header />
                <main className={this.props.classes.content}>
                    <div className={this.props.classes.appBarSpacer} />

                    <PageAppBar title="app.admin.payment.title.success">
                    </PageAppBar>

                    <div className={this.props.classes.pad}>
                        //
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

PaymentSuccess.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentSuccess);