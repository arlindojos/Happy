import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './pages/landing';
import OrphanagesMap from './pages/OrphanagesMap';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/app" component={OrphanagesMap}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;