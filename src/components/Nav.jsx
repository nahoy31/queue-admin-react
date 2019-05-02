import React from 'react';
import { Link } from 'react-router-dom'
import { Trans } from 'react-i18next';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
}

export const mainListItems = (
    <div>
        <ListSubheader inset>
            <Trans>app.admin.layout.nav.jobs</Trans>
        </ListSubheader>
        <ListItemLink to="/admin/jobs/">
            <ListItemText primary={<Trans>app.admin.layout.text.all</Trans>} />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=pending">
            <ListItemText primary={<Trans>app.admin.layout.text.pending</Trans>} />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=running">
            <ListItemText primary={<Trans>app.admin.layout.text.running</Trans>} />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=failed">
            <ListItemText primary={<Trans>app.admin.layout.text.failed</Trans>} />
        </ListItemLink>
        <ListItemLink to="/admin/jobs/?status=finished">
            <ListItemText primary={<Trans>app.admin.layout.text.finished</Trans>} />
        </ListItemLink>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>
            <Trans>app.admin.layout.nav.settings</Trans>
        </ListSubheader>
        <ListItemLink to="/admin/consumption/">
            <ListItemText primary={<Trans>app.admin.layout.nav.settings.consumption</Trans>} />
        </ListItemLink>
        <ListItemLink to="/admin/profile/">
            <ListItemText primary={<Trans>app.admin.layout.nav.settings</Trans>} />
        </ListItemLink>
        <ListItemLink to="/admin/plan/">
            <ListItemText primary={<Trans>app.admin.layout.nav.settings.plan</Trans>} />
        </ListItemLink>
    </div>
);