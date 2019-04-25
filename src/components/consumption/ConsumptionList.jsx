import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../layout/styles.jsx';

import { Trans } from 'react-i18next';

class ConsumptionList extends React.Component {
    render() {
        var isEmpty   = Object.getOwnPropertyNames(this.props.datas).length === 0;
        var journalEntries = [];

        if (isEmpty === false) {
            for (var label in this.props.datas) {
                if (label === 'total') {
                    continue;
                }

                var arr = this.props.datas[label];

                if (arr['apiResult'] !== undefined) {
                    journalEntries.push(<MyTable classes={this.props.classes} title={label} total={arr.total} rows={arr.apiResult} />);
                }

            }
        }

        return (
            <div>
                {journalEntries}
            </div>
        );
    }
}

class MyTable extends React.Component {
    render() {
        return (
            <div>
                <Paper className={this.props.classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        {this.props.title}
                    </Typography>

                    <Table>
                        <MyTableRowHeader />

                        {this.props.rows.map(row => (
                            <MyTableRowBody username={row.username} method={row.method} uri={row.uri} lastValue={row.lastValue} />
                        ))}

                        <MyTableRowFooter total={this.props.total} />
                    </Table>
                </Paper>

                <Divider light={true} className={this.props.classes.divider} />
            </div>
        );
    }
}

class MyTableRowHeader extends React.Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell><Trans>app.admin.consumption.username</Trans></TableCell>
                    <TableCell><Trans>app.admin.consumption.method</Trans></TableCell>
                    <TableCell><Trans>app.admin.consumption.requests</Trans></TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

class MyTableRowBody extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>
                    {this.props.username}
                </TableCell>
                <TableCell>
                    <span class="label label-default">{this.props.method}</span> {this.props.uri}
                </TableCell>
                <TableCell>
                    {this.props.lastValue}
                </TableCell>
            </TableRow>
        );
    }
}

class MyTableRowFooter extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell colSpan={2} style={{ 'text-align': 'right' }}>
                    <strong>Total</strong>
                </TableCell>
                <TableCell>
                    {this.props.total}
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(ConsumptionList);
