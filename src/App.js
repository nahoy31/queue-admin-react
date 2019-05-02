import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Redirect
} from "react-router-dom";

import SignIn from './components/SignIn.jsx';
import SignOut from './components/SignOut.jsx';
import SignUp from './components/SignUp.jsx';
import Job from './components/Job.js';
import JobNew from './components/JobNew.jsx';
import JobView from './components/JobView.jsx';
import Consumption from './components/Consumption.jsx';
import Settings from './components/Settings.jsx';
import Plan from './components/Plan.jsx';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCanceled from './components/PaymentCanceled';

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './components/CheckoutForm';

function isAuthenticated() {
    var token = window.localStorage.getItem('access_token');

    if (token) {
      return true;
    } else {
      return false;
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    // authentifié...
                    <Component {...props} />
                ) : (
                    // Pas authentifié
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

class App extends Component {
  render() {
    return (
        <StripeProvider apiKey="pk_test_rV8HherPuDPH2T0X6F37dFaY">
        <BrowserRouter>
          <Route path="/signin/" component={SignIn} />
          <Route path="/logout/" component={SignOut} />
          <Route path="/signup/" component={SignUp} />
          <PrivateRoute exact path="/admin/jobs/" component={Job} />
          <PrivateRoute exact path="/admin/jobs/new" component={JobNew} />
          <PrivateRoute exact path="/admin/jobs/view/:id" component={JobView} />
          <PrivateRoute exact path="/admin/consumption/" component={Consumption} />
          <PrivateRoute exact path="/admin/profile/" component={Settings} />
          <PrivateRoute exact path="/admin/plan/" component={Plan} />
          <PrivateRoute exact path="/admin/payment/success" component={PaymentSuccess} />
          <PrivateRoute exact path="/admin/payment/canceled" component={PaymentCanceled} />
        </BrowserRouter>
        </StripeProvider>
    );
  }
}

export default App;
