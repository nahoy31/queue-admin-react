import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router'

import LinearProgress from '@material-ui/core/LinearProgress';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import withStyles from '@material-ui/core/styles/withStyles';

const axios = require('axios');

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

var createReactClass = require('create-react-class');

var SignUp = createReactClass({

    getInitialState: function() {
        return {
            open:     false,
            redirect: false,
            token:    ''
        }
    },

    handleClose: function(event, reason) {
        this.setState({open: false});
    },

    renderRedirect: function() {
        if (this.state.redirect) {
            return <Redirect to='/admin/' />
        }
    },

    /**
     * @todo ask token with application (admin/admin) access !
     */
    handleSubmit: function(e) {
        e.preventDefault();

        var progress        = document.getElementById('progress');
        var username        = document.getElementById('username').value;
        var email           = document.getElementById('email').value;
        var password        = document.getElementById('password').value;
        var form_data       = new FormData();
        var options = {
            'username'      : username,
            'email'         : email,
            'plainPassword' : password,
            'enabled'       : true
        };

        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 1000,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        progress.style.display = 'block';

        form_data.append('_username', 'admin');
        form_data.append('_password', 'admin');

        instance.post('/api/login_check', form_data)
            .then(function (response) {
                var instance2 = axios.create({
                    baseURL: 'http://localhost:5000',
                    timeout: 1000,
                    headers: {
                        'Authorization': 'Bearer ' + response.data.token,
                        'Content-Type': 'application/json',
                        'Charset': 'UTF-8'
                    }
                });

                instance2.post('/api/users', options)
                    .then(function (response2) {
                        progress.style.display = 'none';

                        /**
                         * @todo add redirect
                         * @todo add success message
                         */
                        alert('Account created!');
                    })
                    .catch(function (error2) {
                        console.log(error2);

                        progress.style.display = 'none';
                        alert('Account creation error!');
                    })
                ;
            })
            .catch(function (error) {
                console.log(error);
            })
        ;
    },

    render: function() {
        return (
            <main className={this.props.classes.main}>
                {this.renderRedirect()}
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create your account now
                    </Typography>

                    <form className={this.props.classes.form}>

                        <LinearProgress id='progress' style={{ display: 'none' }} />

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" autoFocus />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input name="email" type="text" id="email" />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="passwordConfirm">Confirm your password</InputLabel>
                            <Input name="passwordConfirm" type="password" id="passwordConfirm" />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.props.classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Create your account
                        </Button>

                        <hr  style={{ margin: '30px 0px' }} />
                        <div>
                            <a href="/signin/">
                                I already have an account
                            </a>
                        </div>

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                        >
                            <SnackbarContent
                                onClose={this.handleClose}
                                message="This is an error message!"
                            />
                        </Snackbar>

                    </form>

                </Paper>
            </main>
        )
    }
});

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool
};

export default withStyles(styles)(SignUp);