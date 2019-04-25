import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';

import { Redirect } from 'react-router'

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

class JobCreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            shareholders: [{ name: "" }]
        };

        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleAddShareholder = this.handleAddShareholder.bind(this);
        this.handleRemoveShareholder = this.handleRemoveShareholder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/admin/jobs/' />
        }
    }

    handleAddShareholder() {
        this.setState({
            shareholders: this.state.shareholders.concat([{ name: "" }])
        });
    }

    handleRemoveShareholder(e) {
        e.preventDefault();

        var idx = e.currentTarget.dataset.target;
        var collection = this.state.shareholders;

        collection.splice(idx, 1);

        this.setState({
            shareholders: collection
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        var main      = this;
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
            command:  document.getElementById('command').value,
            args:     [],
            queue:    document.getElementById('queue').value,
            priority: parseInt(document.getElementById('priority').value)
        };

        var args = document.getElementsByName('args[]');
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (arg.value !== "") {
                form_data.args.push(arg.value);
            }
        }

        console.log(form_data);
        progress.style.display = 'block';

        instance.post('/api/jobs', form_data)
            .then(function (response) {
                console.log(response);

                progress.style.display = 'none';

                main.setState({redirect: true});
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            });
    }

    render() {
        return (
            <form className={this.props.classes.container}>
                {this.renderRedirect()}

                <Typography variant="h5" component="h3">
                    New Job
                </Typography>

                <TextField
                    id="command"
                    label="Command"
                    className={this.props.classes.textField}
                    value={this.props.data.command}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {this.state.shareholders.map((shareholder, idx) => (
                    <FormControl key={idx} margin="normal" required fullWidth>
                        <TextField
                            id={"args_" + idx}
                            key={"args_" + idx}
                            name={"args[]"}
                            placeholder={`Argument #${idx + 1}`}
                            className={this.props.classes.textField}
                            margin="normal"
                            variant="filled"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            type="button"
                            data-target={idx}
                            onClick={this.handleRemoveShareholder}
                        >
                            Remove element
                        </Button>
                    </FormControl>
                ))}

                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    type="button"
                    onClick={this.handleAddShareholder}
                >
                    <AddIcon fontSize={"small"} className={this.props.classes.icon} />
                    Add element
                </Button>

                <TextField
                    id="queue"
                    label="Queue"
                    className={this.props.classes.textField}
                    value={this.props.data.queue}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="priority"
                    label="Priority"
                    className={this.props.classes.textField}
                    value={"0"}
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

JobCreateForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobCreateForm);