import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import WelcomePage from './WelcomePage';
import SurplusPage from './SurplusPage';
import MarketplacePage from './MarketplacePage';
import NotFoundPage from './NotFoundPage';

class Main extends Component {
  
  render() {
    const dummyUserId = '9fdn34dsb49sad';
    const MarketplacePageFunc = (props) => {
      return (
        <MarketplacePage curUserId={dummyUserId}/>
      );
    };
    return (
        <main>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/marketplace" render={MarketplacePageFunc} />
            <Route exact path="/surplus" component={SurplusPage} />
            <Route path="*" component={NotFoundPage}/>
          </Switch>
        </main>
    );
  }
}
export default Main;
