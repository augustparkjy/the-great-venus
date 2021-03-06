import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from './store/modules/appModule';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Client from './Client';
import AdminPage from './AdminPage/AdminPage';

class App extends Component {

	componentDidMount() {
		this.initLanguage();
	}

	initLanguage = () => {
		switch(window.navigator.language) {
			case "ko-KR":
				this.props.AppActions.setLanguage('ko'); break;
			default:
				this.props.AppActions.setLanguage('en'); break;
		}
	}

	render() {
		return (
		<BrowserRouter>
			<Switch>
				<Route path="/client" component={Client} />
				<Route path="/test" component={AdminPage} />
				<Route component={Main} />
			</Switch>
		</BrowserRouter>
		);
	}
}

export default connect(
	null,
	(dispatch) => ({
		AppActions: bindActionCreators(appActions, dispatch),
	})
)(App);
