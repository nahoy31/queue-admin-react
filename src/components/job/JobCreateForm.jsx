import React from 'react';
import { Redirect } from 'react-router'
import { Trans } from 'react-i18next';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../layout/styles.jsx';

const axios = require('axios');

class JobCreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            shareholders: [{ name: "" }],
            data: {
                command: "",
                args: {
                    0: ""
                },
                queue: "",
                priority: "0"
            }
        };

        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleAddShareholder = this.handleAddShareholder.bind(this);
        this.handleRemoveShareholder = this.handleRemoveShareholder.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        var newData = this.state.data;

        if (name === "args[]") {
            var idx = target.dataset.target;
            newData["args"][idx] = value;
        } else {
            newData[name] = value;
        }

        this.setState({
            data: newData
        });
    }

    handleSubmit = () => {
        var main      = this;
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

        progress.style.display = 'block';

        instance.post('/api/jobs', form_data)
            .then(function (response) {
                progress.style.display = 'none';

                main.setState({
                    redirect: true
                });
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            });
    }

    render() {
        return (
            <ValidatorForm
                ref="form"
                className={this.props.classes.container}
                onSubmit={this.handleSubmit}
            >
                {this.renderRedirect()}

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="command" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.job.command</Trans>
                    </InputLabel>
                    <TextValidator
                        fullWidth
                        id="command"
                        name={"command"}
                        value={this.state.data.command}
                        classes={{root: this.props.classes.bootstrapRoot}}
                        onChange={this.handleInputChange}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                </FormControl>

                <table>
                    <tbody>
                        {this.state.shareholders.map((shareholder, idx) => (
                            <tr>
                                <td>
                                    <FormControl key={idx} className={this.props.classes.formControl} fullWidth>
                                        <InputLabel shrink htmlFor="command" className={this.props.classes.bootstrapFormLabel}>
                                            <Trans>app.admin.job.arg</Trans> {idx + 1}
                                        </InputLabel>

                                        <TextValidator
                                            id={"args_" + idx}
                                            inputProps={{
                                                "data-target": idx
                                            }}
                                            name={"args[]"}
                                            value={this.state.data.args[idx]}
                                            classes={{root: this.props.classes.bootstrapRoot}}
                                            onChange={this.handleInputChange}
                                        />
                                    </FormControl>
                                </td>
                                <td>
                                    <Button
                                        key={"remove_" + idx}
                                        variant="outlined"
                                        size="medium"
                                        color="primary"
                                        type="button"
                                        data-target={idx}
                                        onClick={this.handleRemoveShareholder}
                                    >
                                        <Trans>app.admin.layout.action.delete</Trans> <Trans>app.admin.layout.text.element</Trans>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div align={"left"} className={this.props.classes.formControl}>
                    <Button
                        align={"left"}
                        variant="outlined"
                        size="medium"
                        color="primary"
                        type="button"
                        onClick={this.handleAddShareholder}
                    >
                        <AddIcon fontSize={"small"} className={this.props.classes.icon} />
                        <Trans>app.admin.layout.action.add</Trans> <Trans>app.admin.layout.text.element</Trans>
                    </Button>
                </div>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink htmlFor="queue" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.job.queue</Trans>
                    </InputLabel>
                    <TextValidator
                        id="queue"
                        name={"queue"}
                        value={this.state.data.queue}
                        classes={{root: this.props.classes.bootstrapRoot}}
                        onChange={this.handleInputChange}
                    />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink htmlFor="priority" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.job.priority</Trans>
                    </InputLabel>
                    <TextValidator
                        id="priority"
                        name={"priority"}
                        value={this.state.data.priority}
                        classes={{root: this.props.classes.bootstrapRoot}}
                        onChange={this.handleInputChange}
                        validators={['required', 'isNumber']}
                        errorMessages={['this field is required', 'this field must be a number']}
                    />
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

                    <Button
                        type="reset"
                        variant="contained"
                        className={this.props.classes.button}
                    >
                        <Trans>app.admin.layout.action.cancel</Trans>
                    </Button>
                </div>
            </ValidatorForm>
        )
    }
}

JobCreateForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobCreateForm);