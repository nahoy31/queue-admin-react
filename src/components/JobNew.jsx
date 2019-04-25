import React from 'react';
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Trans } from 'react-i18next';

import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import JobCreateForm from './job/JobCreateForm.jsx';

class JobNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entities: []
        };
    }

    componentDidMount() {
        //
    }

    componentWillUnmount() {
        //
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
                                <Trans>app.admin.job.title.new</Trans>
                            </Typography>

                            <div>
                                <IconButton color="inherit">
                                    <Link to={'/admin/jobs/'} className={this.props.classes.underlineNone}>
                                        <ArrowBackIcon fontSize={"large"} className={this.props.classes.icon} />
                                    </Link>
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>

                    <div className={this.props.classes.pad}>
                        <Paper className={this.props.classes.paper}>
                            <LinearProgress id='progress' style={{ display: 'none' }} />
                            <JobCreateForm data='' />
                        </Paper>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

JobNew.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobNew);