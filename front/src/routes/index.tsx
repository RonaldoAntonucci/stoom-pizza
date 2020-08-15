import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dough from '../pages/Dough';
import Additional from '../pages/Additional';
import Size from '../pages/Size';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dough} />

    <Route path="/dough" exact component={Dough} />
    <Route path="/additional" exact component={Additional} />
    <Route path="/size" exact component={Size} />
  </Switch>
);

export default Routes;
