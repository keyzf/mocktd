import { Router, Route, Switch, Redirect } from 'react-router';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import Interface from './components/interface';
import Project from './components/project';
const history = createHistory();
export default function () {
    return (
        <Router history={ history }>
            <Switch>
                <Route path="/project" component={Project}></Route>
                <Route path="/interface/:projectId/:interfaceId?" component={Interface} />
                <Redirect to='/project'/>
            </Switch>
        </Router>
    );
}