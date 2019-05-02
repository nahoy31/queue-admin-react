import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
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

var SignIn = createReactClass({

    getInitialState: function() {
        return {
            open:     false,
            redirect: false
        }
    },

    handleClose: function(event, reason) {
        this.setState({open: false});
    },

    renderRedirect: function() {
        if (this.state.redirect) {
            return <Redirect to='/admin/jobs/' />
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();

        console.log(this.state);
        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 5000,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        var main      = this;
        var progress  = document.getElementById('progress');
        var username  = document.getElementById('username').value;
        var password  = document.getElementById('password').value;
        var form_data = new FormData();

        form_data.append('_username', username);
        form_data.append('_password', password);

        progress.style.display = 'block';

        instance.post('/api/login_check', form_data)
        .then(function (response) {
            console.log(response);

            progress.style.display = 'none';

            window.localStorage.setItem('access_token', response.data.token);
            window.localStorage.setItem('access_username', username);

            main.setState({
                redirect: true
            })
        })
        .catch(function (error) {
            console.log(error);

            progress.style.display = 'none';

            window.localStorage.removeItem('access_token');

            main.setState({open: true});
        });
    },

    render: function() {
        return (
            <main className={this.props.classes.main}>
                {this.renderRedirect()}
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form className={this.props.classes.form}>

                        <LinearProgress id='progress' style={{ display: 'none' }} />

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.props.classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Sign in
                        </Button>

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

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool
};

export default withStyles(styles)(SignIn);