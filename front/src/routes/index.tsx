import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dough from '../pages/Dough';
import Ingredients from '../pages/Ingredients';
import Size from '../pages/Size';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dough} />

    <Route path="/doughs" exact component={Dough} />
    <Route path="/ingredients" exact component={Ingredients} />
    <Route path="/size" exact component={Size} />
  </Switch>
);

export default Routes;
