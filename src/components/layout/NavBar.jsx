import React from 'react';
import { Trans } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './styles.jsx';

export default withStyles(styles)(
    class NavBar extends React.Component {
        state = {
            anchorEl: null,
        };

        handleMenu = event => {
            this.setState({ anchorEl: event.currentTarget });
        };

        handleClose = () => {
            this.setState({ anchorEl: null });
        };

        render() {
            const { classes } = this.props;
            const { anchorEl } = this.state;
            const open = Boolean(anchorEl);

            return (
                <AppBar position="absolute" className={classNames(classes.appBar, this.props.open && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.props.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.handleDrawer}
                            className={classNames(
                                classes.menuButton,
                                this.props.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            <Trans>app.admin.layout.title</Trans>
                        </Typography>

                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>
                                    <Link href={"/logout/"} className={classes.link} color="inherit">
                                        <Trans>app.admin.layout.menu.logout</Trans>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            );
        }
    }
)
