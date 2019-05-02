import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';

import Moment from 'moment';

import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageAppBar from './layout/PageAppBar.jsx'

const axios = require('axios');

const tiers = [
    {
        id: "medium",
        amount: 30,
        title: 'Pro',
        subheader: 'Most popular',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    }
];

class Checkout extends React.Component {
    onToken = (token, addresses) => {
        alert('test!');
        console.log(token);
        console.log(addresses);
        // TODO: Send the token information and any other
        // relevant information to your payment process
        // server, wait for the response, and update the UI
        // accordingly. How this is done is up to you. Using
        // XHR, fetch, or a GraphQL mutation is typical.
    };

    render() {
        return (
            <StripeCheckout
                amount={this.props.amount}
                description={this.props.description}
                stripeKey="pk_test_rV8HherPuDPH2T0X6F37dFaY"
                token={this.onToken}
            />
        )
    }
}

class Plan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entities: []
        };
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    loadDataFromServer() {
        var main           = this;
        var progress       = document.getElementById('progress');
        var token          = window.localStorage.getItem('access_token');

        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        instance.get('/api/plans')
            .then(function (response) {
                progress.style.display = 'none';

                main.setState({
                    entities: response.data['hydra:member']
                });
            })
            .catch(function (error) {
                console.log(error);

                progress.style.display = 'none';
            })
        ;
    }

    handleClick(e) {
        var stripe = window.Stripe('pk_test_rV8HherPuDPH2T0X6F37dFaY');
        var planId = e.currentTarget.dataset.id;

        // get user informations
        var main            = this;
        var token           = window.localStorage.getItem('access_token');
        var username        = window.localStorage.getItem('access_username');

        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        var options = {
            'username' : username
        };

        var esc   = encodeURIComponent;
        var query = Object.keys(options)
            .map(k => esc(k) + '=' + esc(options[k]))
            .join('&')
        ;

        instance.get('/api/users?' + query)
            .then(function (response) {
                var entity = response.data['hydra:member'][0];

                // When the customer clicks on the button, redirect
                // them to Checkout.
                stripe.redirectToCheckout({
                    items: [{plan: planId, quantity: 1}],

                    customerEmail: entity.email,

                    // Note that it is not guaranteed your customers will be redirected to this
                    // URL *100%* of the time, it's possible that they could e.g. close the
                    // tab between form submission and the redirect.
                    successUrl: 'http://localhost:3000/admin/payment/success',
                    cancelUrl: 'http://localhost:3000/admin/payment/canceled'
                })
                    .then(function (result) {
                        if (result.error) {
                            // If `redirectToCheckout` fails due to a browser or network
                            // error, display the localized error message to your customer.
                            var displayError = document.getElementById('error-message');
                            displayError.textContent = result.error.message;
                        }
                    });
            })
            .catch(function (error) {
                console.log(error);
            })
        ;
    }

    render() {
        console.log(this.state.entities);

        return (
            <div className={this.props.classes.root}>
                <CssBaseline />
                <Header />
                <main className={this.props.classes.content}>
                    <div className={this.props.classes.appBarSpacer} />

                    <PageAppBar title="app.admin.plan.title.index">
                    </PageAppBar>

                    <div className={this.props.classes.pad}>
                        <LinearProgress id='progress' style={{ display: 'block' }} />

                        <div id="error-message"></div>

                        <Grid container spacing={40} alignItems="flex-end">
                            {this.state.entities.map(entity => (
                                <Grid item key={entity.id} xs={12} sm={6} md={4}>
                                    <Card>
                                        <CardHeader
                                            title={entity.name}
                                            subheader={entity.subtitle}
                                            titleTypographyProps={{ align: 'center' }}
                                            subheaderTypographyProps={{ align: 'center' }}
                                            action={null}
                                            className={this.props.classes.cardHeader}
                                        />

                                        <CardContent>
                                            <div className={this.props.classes.cardPricing}>
                                                <Typography component="h2" variant="h3" color="textPrimary">
                                                    {entity.amount}
                                                </Typography>
                                                <Typography variant="h6" color="textSecondary">
                                                    /mo
                                                </Typography>
                                            </div>
                                            {entity.descriptionRows.map(line => (
                                                <Typography variant="subtitle1" align="center" key={line}>
                                                    {line}
                                                </Typography>
                                            ))}
                                        </CardContent>

                                        <CardActions className={this.props.classes.cardActions}>
                                            <button
                                                role="link"
                                                data-id={entity.code}
                                                onClick={this.handleClick}
                                            >
                                                Checkout
                                            </button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

Plan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Plan);