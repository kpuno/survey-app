import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import EditProfile from './components/user/EditProfile';
import RequireAuth from './components/hocs/requireAuth';
import CreateSurvey from './components/survey/CreateSurvey';
import Dashboard from './components/Dashboard';
import Survey from './components/survey/Survey';
import SearchSurvey from './components/survey/SearchSurvey';
import Analytics from './components/survey/Analytics';
import SurveyStats from './components/survey/SurveyStats';
import Exipred from './components/survey/Exipred';
import Settings from './components/Settings';
import ChangePassword from './components/user/ChangePassword';

export default (
	<Route path="/" component={App}>
		<Route path="/home" component={HomePage} />
		<Route path="/signin" component={SignIn} />
		<Route path="/signup" component={SignUp} />
		<Route path="/dashboard" component={RequireAuth(Dashboard)} />
		<Route path="/editprofile" component={RequireAuth(EditProfile)} />
		<Route path="/changepassword" component={RequireAuth(ChangePassword)} />
		<Route path="/createsurvey" component={RequireAuth(CreateSurvey)} />
		<Route path="/survey" component={Survey} />
		<Route path="/searchsurvey" component={SearchSurvey} />
		<Route path="/surveyexipred" component={Exipred} />
		<Route path="/analytics" component={RequireAuth(Analytics)} />
		<Route path="/analytics/:title" component={RequireAuth(SurveyStats)} />
		<Route path="/settings" component={RequireAuth(Settings)} />
		<Route path="*" component={NotFoundPage} />
	</Route>
);
