import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import WelcomePage from './WelcomePage';
import SurplusPage from './SurplusPage';
import MarketplacePage from './MarketplacePage';
// import DriversGuidePage from './DriversGuidePage';
import NotFoundPage from './NotFoundPage';

class Main extends Component {
  render() {
    return (
        <main>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/marketplace" component={MarketplacePage} />
            {/* <Route exact path="/examen_express" component={QuizPage} /> */}
            <Route exact path="/surplus" component={SurplusPage} />
            <Route path="*" component={NotFoundPage}/>
          </Switch>
        </main>
    );
  }
}
export default Main;
