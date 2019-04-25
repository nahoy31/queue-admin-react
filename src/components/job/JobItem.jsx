import React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Moment from 'moment';

import { Trans } from 'react-i18next';

class JobItem extends React.Component {

    render() {
        return (
            <List>
                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.id</Trans>} secondary={this.props.entity.id} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.command</Trans>} secondary={this.props.entity.command + ' ' + this.props.entity.args} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.status</Trans>} secondary={this.props.entity.status} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.queue</Trans>} secondary={this.props.entity.queue} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.worker_name</Trans>} secondary={this.props.entity.workerName} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.priority</Trans>} secondary={this.props.entity.priority} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.createdAt</Trans>} secondary={this.props.entity.createdAt ? Moment(this.props.entity.createdAt).format('DD/MM/YYYY HH:mm:ss') : ''} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.startedAt</Trans>} secondary={this.props.entity.startedAt ? Moment(this.props.entity.startedAt).format('DD/MM/YYYY HH:mm:ss') : ''} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.checkedAt</Trans>} secondary={this.props.entity.checkedAt ? Moment(this.props.entity.checkedAt).format('DD/MM/YYYY HH:mm:ss') : ''} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.closedAt</Trans>} secondary={this.props.entity.closedAt ? Moment(this.props.entity.closedAt).format('DD/MM/YYYY HH:mm:ss') : ''} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.runtime</Trans>} secondary={this.props.entity.runtime} />
                </ListItem>
                <Divider component="li" />

                <ListItem>
                    <ListItemText primary={<Trans>app.admin.job.exitCode</Trans>} secondary={this.props.entity.exitCode} />
                </ListItem>
            </List>
        )
    }
}

export default JobItem;