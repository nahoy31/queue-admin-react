import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import styles from '../layout/styles.jsx';

class JobSearch extends React.Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loadNotesFromServer = this.props.loadNotesFromServer.bind(this);
    }

    handleInputChange() {
        var progress = document.getElementById('progress');

        progress.style.display = 'block';

        this.loadNotesFromServer();
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.inputContainer}>
                            <InputBase
                                name="command"
                                placeholder="Command"
                                className={this.props.classes.input}
                            />
                            <IconButton
                                className={this.props.classes.iconButton}
                                aria-label="Search"
                                onClick={() => { this.handleInputChange() }}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>

                    <Grid item xs={3}>
                        <Paper className={this.props.classes.inputContainer}>
                            <InputBase
                                name="args"
                                placeholder="Arguments"
                                className={this.props.classes.input}
                            />
                            <IconButton
                                className={this.props.classes.iconButton}
                                aria-label="Search"
                                onClick={() => { this.handleInputChange() }}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>

                    <Grid item xs={3}>
                        <Paper className={this.props.classes.inputContainer}>
                            <Select
                                native
                                onChange={this.handleInputChange}
                                inputProps={{
                                    id: 'status',
                                    name: 'status'
                                }}
                                className={this.props.classes.input}
                            >
                                <option value="">Status</option>
                                <option value="pending">Pending</option>
                                <option value="running">Running</option>
                                <option value="failed">Failed</option>
                                <option value="finished">Finished</option>
                                <option value="canceled">Canceled</option>
                                <option value="terminated">Terminated</option>
                            </Select>
                        </Paper>
                    </Grid>

                    <Grid item xs={3}>
                        <Paper className={this.props.classes.inputContainer}>
                            <InputBase
                                name="queue"
                                placeholder="Queue"
                                className={this.props.classes.input}
                            />
                            <IconButton
                                className={this.props.classes.iconButton}
                                aria-label="Search"
                                onClick={() => { this.handleInputChange() }}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

JobSearch.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(JobSearch);