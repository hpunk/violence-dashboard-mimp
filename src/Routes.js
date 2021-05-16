import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Home from './views/Home/Home';
import Impact from './views/Impact/Impact';
import Evolution from './views/Evolution/Evolution';
import Clustering from './views/Clustering/Clustering';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/app-impact' component={Impact} />
      <Route exact path='/violence-evolution' component={Evolution} />
      <Route exact path='/clustering' component={Clustering} />
    </Switch>
  )
}

export default Routes