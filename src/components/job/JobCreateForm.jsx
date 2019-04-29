import React from 'react';
import { Redirect } from 'react-router'
import { Trans } from 'react-i18next';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
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
            <form className={this.props.classes.container}>
                {this.renderRedirect()}

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink  htmlFor="command" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.job.command</Trans>
                    </InputLabel>
                    <InputBase fullWidth id="command" value={this.props.data.command} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <table>
                {this.state.shareholders.map((shareholder, idx) => (
                    <tr>
                        <td>
                    <FormControl key={idx} className={this.props.classes.formControl} fullWidth>
                        <InputLabel shrink htmlFor="command" className={this.props.classes.bootstrapFormLabel}>
                            <Trans>app.admin.job.arg</Trans> {idx + 1}
                        </InputLabel>

                        <InputBase id={"args_" + idx} name={"args[]"} value={this.props.data.command} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                    </FormControl>
                        </td>
                        <td>
                            <Button
                                variant="outlined"
                                size="normal"
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
                </table>

                <div align={"left"} className={this.props.classes.formControl}>
                    <Button
                        align={"left"}
                        variant="outlined"
                        size="normal"
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
                    <InputBase id="queue" value={this.props.data.queue} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
                </FormControl>

                <FormControl className={this.props.classes.formControl} fullWidth>
                    <InputLabel shrink htmlFor="priority" className={this.props.classes.bootstrapFormLabel}>
                        <Trans>app.admin.job.priority</Trans>
                    </InputLabel>
                    <InputBase id="priority" value={"0"} classes={{root: this.props.classes.bootstrapRoot, input: this.props.classes.bootstrapInput}} />
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
            </form>
        )
    }
}

JobCreateForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobCreateForm);