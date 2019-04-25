import React from 'react';
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// JobStatus
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import MoreVert from '@material-ui/icons/MoreVert';

import Moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../layout/styles.jsx';

import { Trans } from 'react-i18next';

const axios = require('axios');

class JobList extends React.Component {
    render() {
        return (
            <Paper>
                <Table className="table table-bordered table-striped">
                    <TableHead>
                        <TableRow>
                            <TableCell className={this.props.classes.tablecell}><Trans>app.admin.job.command</Trans></TableCell>
                            <TableCell className={this.props.classes.tablecell}><Trans>app.admin.job.createdAt</Trans></TableCell>
                            <TableCell className={this.props.classes.tablecell}><Trans>app.admin.job.startedAt</Trans></TableCell>
                            <TableCell className={this.props.classes.tablecell}><Trans>app.admin.job.closedAt</Trans></TableCell>
                            <TableCell className={this.props.classes.tablecell}><Trans>app.admin.job.worker_name</Trans></TableCell>
                            <TableCell className={this.props.classes.tablecell}><Trans>app.admin.job.queue</Trans></TableCell>
                            <TableCell className={this.props.classes.tablecell}><Trans>app.admin.job.status</Trans></TableCell>
                            <TableCell className={this.props.classes.tablecell} colSpan="2">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <NoteList entities={this.props.entities} classes={this.props.classes} loadNotesFromServer={this.props.loadNotesFromServer} />
                </Table>
            </Paper>
        );
    }
}

class NoteList extends React.Component {
    render() {
        var classes = this.props.classes;
        var main    = this;

        var noteNodes = this.props.entities.map(function(note) {
            return (
                <NoteBox loadNotesFromServer={main.props.loadNotesFromServer} classes={classes} id={note.id} command={note.command} args={note.args} createdAt={note.createdAt} startedAt={note.startedAt} checkedAt={note.checkedAt} closedAt={note.closedAt} workerName={note.workerName} queue={note.queue} status={note.status} priority={note.priority} key={note.id}>{note.note}</NoteBox>
            );
        });

        return (
            <TableBody>
            {noteNodes}
            </TableBody>
        );
    }
}

class JobStatus extends React.Component {
    render() {
        var status = this.props.status;

        if (status === 'running') {
            return (
                <CircularProgress className={this.props.classes.icon} color={"primary"} size={24} />
            )
        }

        if (status === 'finished') {
            return (
                <span className={this.props.classes.statusFinished}>
                    <CheckCircleIcon className={this.props.classes.icon} color={"inherit"} />
                </span>
            )
        }

        if (status === 'failed') {
            return (
                <ErrorIcon className={this.props.classes.icon} color={"error"} />
            )
        }

        return (
            <div>
                {this.props.status}
            </div>
        );
    }
}

class NoteBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        };

        this.handleMoreClick = this.handleMoreClick.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleCloneClick = this.handleCloneClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleMoreClick(e) {
        this.setState({
            anchorEl: e.currentTarget
        });
    }

    handleCloseMenu() {
        this.setState({
            anchorEl: null
        });
    }

    handleCloneClick(e) {
        e.preventDefault();

        var main      = this;
        var progress  = document.getElementById('progress');
        var token     = window.localStorage.getItem('access_token');
        var options = {
            'status'   : 'pending',
            'queue'    : this.props.queue,
            'priority' : this.props.priority,
            'command'  : this.props.command,
            'args'     : this.props.args
        };

        const instance = axios.create({
            baseURL: 'http://localhost:8002',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        this.handleCloseMenu();
        progress.style.display = 'block';

        instance.post('/api/jobs', options)
            .then(function (response) {
                main.props.loadNotesFromServer();
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            })
        ;
    }

    handleDeleteClick(e) {
        e.preventDefault();

        var main      = this;
        var progress  = document.getElementById('progress');
        var token     = window.localStorage.getItem('access_token');
        var id        = this.props.id;

        const instance = axios.create({
            baseURL: 'http://localhost:8002',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        this.handleCloseMenu();
        progress.style.display = 'block';

        instance.delete('/api/jobs/' + id)
            .then(function (response) {
                main.props.loadNotesFromServer();
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            })
    }

    render() {
        return (
            <TableRow key={this.props.id} id={"tr-" + this.props.id}>
                <TableCell className={this.props.classes.tablecell}>
                    <Link to={'/admin/jobs/view/' + this.props.id} className={this.props.classes.underlineNone}>
                        <Chip
                            label={this.props.command + " " + this.props.args}
                            clickable
                        />
                    </Link>

                </TableCell>
                <TableCell className={this.props.classes.tablecell}>{this.props.createdAt ? Moment(this.props.createdAt).format('DD/MM/YYYY HH:mm:ss') : ''}</TableCell>
                <TableCell className={this.props.classes.tablecell}>{this.props.startedAt ? Moment(this.props.startedAt).format('DD/MM/YYYY HH:mm:ss') : ''}</TableCell>
                <TableCell className={this.props.classes.tablecell}>{this.props.closedAt ? Moment(this.props.closedAt).format('DD/MM/YYYY HH:mm:ss') : ''}</TableCell>
                <TableCell className={this.props.classes.tablecell}>{this.props.workerName}</TableCell>
                <TableCell className={this.props.classes.tablecell}>{this.props.queue}</TableCell>
                <TableCell className={this.props.classes.tablecell} align={"center"}>
                    <JobStatus status={this.props.status} classes={this.props.classes} />
                </TableCell>
                <TableCell className={this.props.classes.tablecell} style={{ width: '1%' }}>
                    <a
                        className="btn btn-default btn-rounded"
                        href={"#" + this.props.id}
                        aria-owns={'simple-menu-' + this.props.id}
                        aria-haspopup="true"
                        onClick={this.handleMoreClick}
                    >
                        <MoreVert className={this.props.classes.icon} />
                    </a>

                    <Menu
                        id={"simple-menu-" + this.props.id}
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseMenu}
                    >
                        <MenuItem onClick={this.handleCloneClick}>
                            <Trans>app.admin.layout.action.clone</Trans>
                        </MenuItem>
                        <MenuItem onClick={this.handleDeleteClick}>
                            <Trans>app.admin.layout.action.delete</Trans>
                        </MenuItem>
                    </Menu>

                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(JobList);
