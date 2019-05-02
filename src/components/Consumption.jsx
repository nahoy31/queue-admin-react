import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';

import Moment from 'moment';

import styles from './layout/styles.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageAppBar from './layout/PageAppBar.jsx'
import ConsumptionList from './consumption/ConsumptionList.jsx';

const axios = require('axios');

class Consumption extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entities: {}
        };
    }

    componentDidMount() {
        this.loadNotesFromServer();
    }

    loadNotesFromServer() {
        var main      = this;
        var progress  = document.getElementById('progress');
        var token     = window.localStorage.getItem('access_token');
        var username  = window.localStorage.getItem('access_username');
        var query     = 'username=' + username + '&metricName=consumptionTotalByMonth';

        // try to put data in this.state :)
        var data      = {
            'total': 0
        };

        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Charset': 'UTF-8'
            }
        });

        progress.style.display = 'block';

        instance.get('/api/consumptions?' + query)
            .then(function (response) {
                var apiResult = response.data['hydra:member'];

                // iterate on each couple month/year
                for (const key in apiResult) {
                    let arr = apiResult[key];

                    var date           = Moment(arr.date);
                    var totalResultKey = date.format('MMMM YYYY');
                    var query          = 'username=' + username
                        + '&metricName=consumptionCountByMethodByMonth'
                        + '&date[after]=' + date.format('YYYY-MM') + '-01'
                        + '&date[before]=' + date.format('YYYY-MM') + '-31'
                    ;

                    data[totalResultKey] = {};
                    data['total']        = data['total'] + arr['lastValue'];

                    progress.style.display = 'block';

                    // get consumption for the couple month/year
                    instance.get('/api/consumptions?' + query)
                        .then(function (response) {
                            var responseUrl         = response.request.responseURL;
                            var dateFromResponseUrl = responseUrl.match(/date\[before\]=([0-9-]+)$/)[1]; // 2019-03-31
                            var date                = Moment(dateFromResponseUrl);
                            var totalResultKey      = date.format('MMMM YYYY');
                            var apiResult           = response.data['hydra:member'];

                            data[totalResultKey]['apiResult'] = apiResult;
                            data[totalResultKey]['total']     = arr['lastValue']; // total for a couple month/year

                            main.setState({
                                entities: data
                            });

                            progress.style.display = 'none';
                        })
                        .catch(function (error) {
                            console.log(error);
                            progress.style.display = 'none';
                        })
                    ;
                }
                // /iterate on each couple month/year
            })
            .catch(function (error) {
                console.log(error);
                progress.style.display = 'none';
            })
        ;
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline />
                <Header />
                <main className={this.props.classes.content}>
                    <div className={this.props.classes.appBarSpacer} />

                    <PageAppBar title="app.admin.consumption.title.index">
                    </PageAppBar>

                    <div className={this.props.classes.pad}>
                        <LinearProgress id='progress' style={{ display: 'none' }} />
                        <ConsumptionList datas={this.state.entities} />
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

Consumption.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Consumption);