import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import ReduxThunk from 'redux-thunk';

import AppWithData from '/imports/client/App';

const client = new ApolloClient({
  reduxRootKey: 'apolloReducer',
});

function count(state = 0, action) {
  if (action.type === "UPDATE_COUNT") {
    return action.data;
  }
  return state;
}

const store = createStore(combineReducers({
  count,
  apolloReducer: client.reducer()
}), {}, applyMiddleware(client.middleware(), ReduxThunk.withExtraArgument(client)));

Meteor.startup(() => {
  render(<ApolloProvider store={store} client={client}>
    <AppWithData />
  </ApolloProvider>, document.getElementById('app'));
});
