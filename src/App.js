import React from 'react';
import PageHeader from "./components/Navigation/PageHeader";
import Homepage from "./views/Homepage/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <PageHeader />
            <Switch>
                <Route exact path="/" component={Homepage}></Route>
                <Route path='/products' />
                <Route path='/esports' />
                <Route path='/support' />
                <Route path='/community' />
            </Switch>
        </Router >
    )
}

export default App;
