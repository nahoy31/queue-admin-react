import React from 'react';
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
}

export const mainListItems = (
    <div>
        <ListSubheader inset>Jobs</ListSubheader>
        <ListItemLink to="/admin/jobs/">
            <ListItemText primary="All" />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=pending">
            <ListItemText primary="Pending" />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=running">
            <ListItemText primary="Running" />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=failed">
            <ListItemText primary="Failed" />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=finished">
            <ListItemText primary="Finished" />
        </ListItemLink>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Settings</ListSubheader>
        <ListItemLink to="/admin/consumption/">
            <ListItemText primary="Consumption" />
        </ListItemLink>
        <ListItemLink to="/admin/profile/">
            <ListItemText primary="Profile" />
        </ListItemLink>
    </div>
);