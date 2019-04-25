import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const axios = require('axios');

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class UserItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
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
        return (
            <form className={this.props.classes.container} noValidate autoComplete="off">

                <Typography variant="h5" component="h3">
                    My profile
                </Typography>

                <TextField
                    id="email"
                    label="Email"
                    className={this.props.classes.textField}
                    value={this.props.entity.email}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="company"
                    label="Company"
                    className={this.props.classes.textField}
                    value={this.props.entity.company}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="firstName"
                    label="FirstName"
                    className={this.props.classes.textField}
                    value={this.props.entity.firstName}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="lastName"
                    label="LastName"
                    className={this.props.classes.textField}
                    value={this.props.entity.lastName}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Typography variant="h5" component="h3">
                    Address
                </Typography>

                <TextField
                    id="address1"
                    label="Address"
                    className={this.props.classes.textField}
                    value={this.props.entity.address1}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="address2"
                    label="Address 2"
                    className={this.props.classes.textField}
                    value={this.props.entity.address2}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="city"
                    label="City"
                    className={this.props.classes.textField}
                    value={this.props.entity.city}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="zipCode"
                    label="ZipCode"
                    className={this.props.classes.textField}
                    value={this.props.entity.zipCode}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="state"
                    label="State"
                    className={this.props.classes.textField}
                    value={this.props.entity.state}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="country"
                    label="Country"
                    className={this.props.classes.textField}
                    value={this.props.entity.country}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="website"
                    label="Website"
                    className={this.props.classes.textField}
                    value={this.props.entity.website}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <hr />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    //className={this.props.classes.submit}
                    onClick={this.handleSubmit}
                >
                    Save
                </Button>

            </form>
        )
    }
}

UserItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserItem);