import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Trans } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles.jsx';

class PageAppBar extends React.Component {

    render() {
        return (
            <AppBar position="static" color="default" className={this.props.classes.pageAppBar}>
                <Toolbar>
                    <Typography variant="h4" color="inherit" className={this.props.classes.grow}>
                        <Trans>{this.props.title}</Trans>
                    </Typography>

                    <div>
                        {this.props.children}
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

PageAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageAppBar);