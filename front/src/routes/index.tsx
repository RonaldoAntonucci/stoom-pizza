import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dough from '../pages/Dough';
import Ingredients from '../pages/Ingredients';
import Size from '../pages/Size';
import Confirmation from '../pages/Confirmation';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dough} />

    <Route path="/doughs" component={Dough} />
    <Route path="/ingredients" component={Ingredients} />
    <Route path="/size" component={Size} />
    <Route path="/confirmation" component={Confirmation} />
  </Switch>
);

export default Routes;
