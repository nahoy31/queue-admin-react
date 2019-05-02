import React from 'react';
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Trans } from 'react-i18next';

import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageAppBar from './layout/PageAppBar.jsx';
import JobItem from './job/JobItem.jsx';

const axios = require('axios');

class JobView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entity: {}
        };
    }

    componentDidMount() {
        this.loadNotesFromServer();
    }

    loadNotesFromServer() {
        var main      = this;
        var progress  = document.getElementById('progress');
        var token     = window.localStorage.getItem('access_token');
        var id        = this.props.match.params.id;

        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        instance.get('/api/jobs/' + id)
            .then(function (response) {
                progress.style.display = 'none';

                main.setState({
                    entity: response.data
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
                    <div className={this.props.classes.appBarSpacer} />

                    <PageAppBar title="app.admin.job.title.show">
                        <Tooltip title={<Trans>app.admin.layout.action.return</Trans>}>
                            <IconButton color="inherit">
                                <Link to={'/admin/jobs/'} className={this.props.classes.underlineNone}>
                                    <ArrowBackIcon fontSize={"large"} className={this.props.classes.icon} />
                                </Link>
                            </IconButton>
                        </Tooltip>
                    </PageAppBar>

                    <div className={this.props.classes.pad}>
                        <Paper>
                            <LinearProgress id='progress' style={{ display: 'block' }} />
                            <JobItem entity={this.state.entity} />
                        </Paper>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

JobView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobView);