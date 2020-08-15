import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Import from '../pages/Import';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/import" component={Import} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
