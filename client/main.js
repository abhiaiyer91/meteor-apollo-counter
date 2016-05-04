import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import AppWithData from '/imports/client/App';

const client = new ApolloClient();

Meteor.startup(() => {
  render(<ApolloProvider client={client}>
    <AppWithData />
  </ApolloProvider>, document.getElementById('app'));
});
