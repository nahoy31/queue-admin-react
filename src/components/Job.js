import React from 'react';
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { Trans } from 'react-i18next';

import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import JobList from './job/JobList.jsx';
import JobSearch from './job/JobSearch.jsx';

const axios = require('axios');

class Job extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entities: [],
            page: 1
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.loadNotesFromServer = this.loadNotesFromServer.bind(this);
    }

    componentDidMount() {
        this.loadNotesFromServer();

        this.interval = setInterval(this.loadNotesFromServer, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    shouldComponentUpdate(nextProps, nextState) {
        var hashEntitiesOld = JSON.stringify(this.state.entities);
        var hashEntitiesNew = JSON.stringify(nextState.entities);

        if (hashEntitiesOld === hashEntitiesNew) {
            return false;
        }

        return true;
    }

    resetFilters() {
        var fieldsName = [
            'status',
            'command',
            'args',
            'queue'
        ];

        for (const key in fieldsName) {
            var name = fieldsName[key];

            if (document.getElementsByName(name)[0]) {
                document.getElementsByName(name)[0].value = '';
            }
        }
    }

    addFilters() {
        var fieldsName = [
            'status',
            'command',
            'args',
            'queue'
        ];

        var options = {
            'order[id]' : 'desc'
        };

        for (const key in fieldsName) {
            var name = fieldsName[key];

            if (document.getElementsByName(name)[0]) {
                var value = document.getElementsByName(name)[0].value;

                if (value) {
                    options[name] = value;
                }
            }
        }

        return options;
    }

    loadNotesFromServer(filters) {
        var main           = this;
        var progress       = document.getElementById('progress');
        var token          = window.localStorage.getItem('access_token');
        var defaultFilters = this.addFilters();

        if (window.location.search !== '') {
            var searchParams = new URLSearchParams(window.location.search);

            this.resetFilters();

            for (var pair of searchParams.entries()) {
                document.getElementsByName(pair[0])[0].value = pair[1];
            }

            defaultFilters = this.addFilters();
        }


        if (filters === undefined) {
            filters = defaultFilters;
        } else {
            filters = {...defaultFilters, ...filters};
        }

        const instance = axios.create({
            baseURL: 'http://localhost:8002',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        var esc   = encodeURIComponent;
        var query = Object.keys(filters)
            .map(k => esc(k) + '=' + esc(filters[k]))
            .join('&');

        instance.get('/api/jobs?page=' + this.state.page + '&' + query)
            .then(function (response) {
                progress.style.display = 'none';

                main.setState({
                    entities: response.data['hydra:member']
                });
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            })
        ;
    }

    handlePrev() {
        var newPage = this.state.page - 1;

        this.setState({
            page: newPage
        });
    }

    handleNext() {
        var newPage = this.state.page + 1;

        this.setState({
            page: newPage
        });
    }

    handleRefresh() {
        var progress = document.getElementById('progress');

        progress.style.display = 'block';

        this.loadNotesFromServer();
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline />
                <Header />

                <main className={this.props.classes.content}>
                    <div className={this.props.classes.appBarSpacer} />

                    <AppBar position="static" color="default" className={this.props.classes.pageAppBar}>
                        <Toolbar>
                            <Typography variant="h4" color="inherit" className={this.props.classes.grow}>
                                <Trans>app.admin.job.title.index</Trans>
                            </Typography>

                            <div>
                                <IconButton color="primary" onClick={this.handleRefresh}>
                                    <RefreshIcon fontSize={"large"} className={this.props.classes.icon} />
                                </IconButton>

                                <IconButton color="primary">
                                    <Link to={'/admin/jobs/new'} className={this.props.classes.underlineNone}>
                                        <AddCircleIcon fontSize={"large"} className={this.props.classes.icon} />
                                    </Link>
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>

                    <div className={this.props.classes.pad} >
                        <JobSearch loadNotesFromServer={this.loadNotesFromServer} />
                    </div>

                    <div className={this.props.classes.padX} >
                        <LinearProgress id='progress' style={{ display: 'block' }} />
                        <JobList entities={this.state.entities} loadNotesFromServer={this.loadNotesFromServer} />
                    </div>

                    <button onClick={this.handlePrev}>
                        Previous
                    </button>

                    <button href={"#"} onClick={this.handleNext}>
                        Next
                    </button>
                </main>
                <Footer />
            </div>
        )
    }
}

Job.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Job);