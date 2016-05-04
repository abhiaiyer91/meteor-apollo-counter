import React, { Component } from 'react';
import { connect } from 'react-apollo';
import { Meteor } from 'meteor/meteor';

/**
 * create a mutation object
 * @param id
 * @returns {{mutation: *, variables: {id: *}}}
 */
function generateMutationObject(id) {
  return {
    mutation: gql`
    mutation createCount($id: String) {
     incrementCount(id: $id)
    }`,
    variables: {
      id
    }
  };
}

/**
 * handle mutation
 * @param mutation - Promise from mutation
 * @param refetch - refetch from prop
 * @returns {*}
 */
function dispatchIncrementMutation(id, mutation, refetch) {
  return mutation(id).then(() => {
    if (refetch) {
      return refetch();
    }
  });
}


function App({ data, mutations }) {
  const count = data && data.counts && data.counts.count;
  const countId = data && data.counts && data.counts._id;
  const incrementMutation = mutations.increment;
  const refetch = data && data.refetch;
  return (
    <div>
      <p>You have clicked this button {count} times.</p>
      <button onClick={function () { return dispatchIncrementMutation(countId, incrementMutation, refetch);}}>
        Click Me
      </button>
    </div>
  );
}

function mapQueriesToProps() {
  return {
    data: {
      query: gql`
          {
            counts {
              _id
              count
            },
          }
        `,
      forceFetch: true
    }
  };
}

function mapMutationsToProps({ ownProps, state }) {
  return {
    increment: generateMutationObject
  };
}

// This container brings in Apollo GraphQL data
const AppWithData = connect({mapQueriesToProps, mapMutationsToProps})
(App);

export default AppWithData;
