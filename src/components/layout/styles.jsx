const drawerWidth = 240;

const styles = theme => ({
    pageAppBar: {
        background: 'none',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
    },

    grow: {
        flexGrow: 1
    },


    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: '0px'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh'
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },

    pageTitle: {
        marginBottom: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 7,
        padding: theme.spacing.unit * 3,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
    },

    pad: {
        padding: theme.spacing.unit * 3
    },
    padX: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    },
    padY: {
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3
    },

    tablecell: {
        paddingLeft: '24px',
        paddingRight: '24px'
    },
    statusFinished: {
        color: '#00a65a'
    },
    statusRunning: {

    },

    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inputContainer: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 5,
    },
    divider: {
        width: '100%',
        height: 1,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },

    button: {
        margin: theme.spacing.unit,
    },

    formControl: {
        marginBottom: theme.spacing.unit * 2
    },

    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'inherit',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
    },



    underlineNone: {
        textDecoration: "none"
    }
});

export default styles;
