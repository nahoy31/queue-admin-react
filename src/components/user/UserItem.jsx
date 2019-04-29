import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../layout/styles.jsx';

const axios = require('axios');

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

    hello() {
        alert('toto!');
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        var progress  = document.getElementById('progress');
        var token     = window.localStorage.getItem('access_token');

        const instance = axios.create({
            baseURL: 'http://localhost:8002',
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
        console.log('T1 debut');
        console.log(this.state);
        console.log('T1 fin');
        const entity = this.props.entity;

        return (
            <form className={this.props.classes.container}>

                <Typography variant="h5" component="h3">
                    My profile
                </Typography>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="email" className={this.props.classes.bootstrapFormLabel}>
                        Email
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="email" value={this.state.entity.email || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="company" className={this.props.classes.bootstrapFormLabel}>
                        Company
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="company" value={entity.company || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="firstName" className={this.props.classes.bootstrapFormLabel}>
                        firstName
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="firstName" value={entity.firstName || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="lastName" className={this.props.classes.bootstrapFormLabel}>
                        lastName
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="lastName" value={entity.lastName || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <Typography variant="h5" component="h3">
                    Address
                </Typography>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="address1" className={this.props.classes.bootstrapFormLabel}>
                        address1
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="address1" value={entity.address1 || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="address2" className={this.props.classes.bootstrapFormLabel}>
                        address2
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="address2" value={entity.address2 || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="city" className={this.props.classes.bootstrapFormLabel}>
                        city
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="city" value={entity.city || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="zipCode" className={this.props.classes.bootstrapFormLabel}>
                        zipCode
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="zipCode" value={entity.zipCode || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="state" className={this.props.classes.bootstrapFormLabel}>
                        state
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="state" value={entity.state || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="country" className={this.props.classes.bootstrapFormLabel}>
                        country
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="country" value={entity.country || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="website" className={this.props.classes.bootstrapFormLabel}>
                        website
                    </InputLabel>
                    <InputBase onChange={this.handleInputChange} fullWidth id="website" value={entity.website || ''} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <Divider component="hr" light={true} className={this.props.classes.divider} />

                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={this.props.classes.button}
                        onClick={this.handleSubmit}
                    >
                        Save
                    </Button>
                </div>
            </form>
        )
    }
}

UserItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserItem);