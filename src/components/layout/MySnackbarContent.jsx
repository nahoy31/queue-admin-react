import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class MySnackbarContent extends React.Component {

    render() {
        const { classes, className, message, onClose, variant, ...other } = this.props;

        return (
            <SnackbarContent
                className={classNames(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        )
    }
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['successX', 'warningX', 'errorX', 'infoX']).isRequired
};

export default withStyles(styles)(MySnackbarContent);