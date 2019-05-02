import React from 'react';
import { Trans } from 'react-i18next';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withStyles } from '@material-ui/core/styles';
import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageAppBar from './layout/PageAppBar.jsx'

const axios = require('axios');

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.blah = React.createRef();

        this.state = {
            entity: {}
        };

        this.loadNotesFromServer = this.loadNotesFromServer.bind(this);
    }

    componentDidMount() {
        this.loadNotesFromServer();
    }

    loadNotesFromServer() {
        var main            = this;
        var progress        = document.getElementById('progress');
        var token           = window.localStorage.getItem('access_token');
        var username        = window.localStorage.getItem('access_username');

        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 5000,
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

                main.setState({
                    entity: response.data['hydra:member'][0]
                });

                main.blah.current.updateData(main.state.entity);
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

                    <PageAppBar title="app.admin.settings.title.edit">
                    </PageAppBar>

                    <div className={this.props.classes.pad}>
                        <Paper className={this.props.classes.paper}>
                            <LinearProgress id='progress' style={{ display: 'block' }} />
                            <UserItem ref={this.blah} classes={this.props.classes} entity={this.state.entity} />
                        </Paper>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);

class UserItem extends React.Component {

    constructor(props) {
        super(props);

        console.log('constructor [start]');
        this.state = {
            entity: props.entity
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit      = this.handleSubmit.bind(this);
    }

    updateData(entity) {
        this.setState({
            entity: entity
        });

        document.getElementById('email').value = entity.email;
        document.getElementById('company').value = entity.company;
        document.getElementById('firstName').value = entity.firstName;
        document.getElementById('lastName').value = entity.lastName;
        document.getElementById('address1').value = entity.address1;
        document.getElementById('address2').value = entity.address2;
        document.getElementById('city').value = entity.city;
        document.getElementById('zipCode').value = entity.zipCode;
        document.getElementById('state').value = entity.state;
        document.getElementById('country').value = entity.country;
        document.getElementById('website').value = entity.website;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var newEntity = this.state.entity;
        newEntity[name] = value;

        this.setState({
            entity: newEntity
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        var progress  = document.getElementById('progress');
        var token     = window.localStorage.getItem('access_token');

        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        var form_data = {
            email:     document.getElementById('email').value,
            company:   document.getElementById('company').value,
            firstName: document.getElementById('firstName').value,
            lastName:  document.getElementById('lastName').value,
            address1:  document.getElementById('address1').value,
            address2:  document.getElementById('address2').value,
            city:      document.getElementById('city').value,
            zipCode:   document.getElementById('zipCode').value,
            state:     document.getElementById('state').value,
            country:   document.getElementById('country').value,
            website:   document.getElementById('website').value
        };

        progress.style.display = 'block';

        instance.put(this.props.entity['@id'], form_data)
            .then(function (response) {
                console.log(response);

                progress.style.display = 'none';
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            });
    }

    render() {
        const entity = this.state.entity;

        return (
            <ValidatorForm
                ref="form"
                className={this.props.classes.container}
                onSubmit={this.handleSubmit}
            >
                <Typography align={"left"} variant="h5" component="h3" gutterBottom={true}>
                    <Trans>app.admin.settings.text.informations</Trans>
                </Typography>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="email" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.email</Trans>
                    </InputLabel>
                    <TextValidator
                        onChange={this.handleInputChange}
                        fullWidth
                        id="email"
                        name={"email"}
                        value={this.state.entity.email || ''}
                        classes={{root: this.props.classes.bootstrapRoot}}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="firstName" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.firstName</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="firstName" defaultValue={entity.firstName || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="lastName" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.lastName</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="lastName" defaultValue={entity.lastName || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <Divider component="hr" light={true} className={this.props.classes.divider} />

                <Typography align={"left"} variant="h5" component="h3" gutterBottom={true}>
                    <Trans>app.admin.settings.text.organization</Trans>
                </Typography>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="company" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.company</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="company" defaultValue={entity.company || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="website" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.website</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="website" defaultValue={entity.website || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <Divider component="hr" light={true} className={this.props.classes.divider} />

                <Typography align={"left"} variant="h5" component="h3" gutterBottom={true}>
                    <Trans>app.admin.settings.text.address</Trans>
                </Typography>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="address1" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.address1</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="address1" defaultValue={entity.address1 || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="address2" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.address2</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="address2" defaultValue={entity.address2 || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="city" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.city</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="city" defaultValue={entity.city || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="zipCode" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.zipCode</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="zipCode" defaultValue={entity.zipCode || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="state" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.state</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="state" defaultValue={entity.state || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="country" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.settings.country</Trans>
                    </InputLabel>
                    <TextValidator onChange={this.handleInputChange} fullWidth id="country" defaultValue={entity.country || ''} classes={{root: this.props.classes.bootstrapRoot}} />
                </FormControl>

                <Divider component="hr" light={true} className={this.props.classes.divider} />

                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={this.props.classes.button}
                    >
                        <Trans>app.admin.layout.action.save</Trans>
                    </Button>
                </div>
            </ValidatorForm>
        )
    }
}
