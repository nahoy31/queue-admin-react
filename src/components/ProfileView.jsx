import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Trans } from 'react-i18next';

import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import UserItem from './user/UserItem.jsx';

const axios = require('axios');

class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entity: {}
        };

        this.loadNotesFromServer = this.loadNotesFromServer.bind(this);
    }

    componentDidMount() {
        this.loadNotesFromServer();
    }

    loadNotesFromServer() {
        var main      = this;
        var progress  = document.getElementById('progress');
        var token     = window.localStorage.getItem('access_token');
        var username  = window.localStorage.getItem('access_username');

        const instance = axios.create({
            baseURL: 'http://localhost:8002',
            timeout: 1000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });


        var options = {
            'username' : username
        };

        var esc   = encodeURIComponent;
        var query = Object.keys(options)
            .map(k => esc(k) + '=' + esc(options[k]))
            .join('&')
        ;

        instance.get('/api/users?' + query)
            .then(function (response) {
                progress.style.display = 'none';

                console.log(response.data['hydra:member'][0]);
                main.setState({
                    entity: response.data['hydra:member'][0]
                });
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            })
        ;
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline />
                <Header />
                <main className={this.props.classes.content}>
                    <Typography className={this.props.classes.pageTitle} variant="h4">
                        <Trans>app.admin.user.title.show</Trans>
                    </Typography>

                    <div className={this.props.classes.padX}>
                        <Paper className={this.props.classes.paper}>
                            <LinearProgress id='progress' style={{ display: 'block' }} />
                            <UserItem entity={this.state.entity} />
                        </Paper>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

ProfileView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileView);