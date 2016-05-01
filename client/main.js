import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Provider } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';

import AppWithData from '/imports/client/App';

const client = new ApolloClient()

Meteor.startup(() => {
  render(<Provider client={client}>
    <AppWithData />
  </Provider>, document.getElementById('app'));
});
