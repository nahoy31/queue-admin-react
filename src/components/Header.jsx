import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import styles from './layout/styles.jsx';
import NavBar from './layout/NavBar.jsx';

import { mainListItems, secondaryListItems } from './Nav.jsx';

class Header extends React.Component {

    constructor(props) {
        super(props);

        var drawer_open = window.localStorage.getItem('drawer_open');

        if (drawer_open === null) {
            drawer_open = false;
        }

        if (drawer_open === 'true') {
            drawer_open = true;
        } else {
            drawer_open = false;
        }

        this.state = {
            open: drawer_open
        };
    }

    handleDrawer = () => {
        var open = null;

        if (this.state.open === true) {
            open = false;
        } else {
            open = true;
        }

        window.localStorage.setItem('drawer_open', open);
        this.setState({
            open: open
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={this.props.classes.root}>
                <NavBar open={this.state.open} handleDrawer={this.handleDrawer} />

                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
