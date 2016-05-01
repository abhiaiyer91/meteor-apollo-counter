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
    mutation: `
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
 * @param id
 * @param mutate
 * @param refetch
 * @returns {*}
 */
function incrementMutation(id, mutate, refetch) {
  const mutationObject = generateMutationObject(id);
  return mutate({
    ...mutationObject
  }).then(() => {
    if (refetch) {
      return refetch();
    }
  });
}


function App({ data, mutate }) {
  const countId = data && data.counts && data.counts._id;
  const count = data && data.counts && data.counts.count;
  return (
    <div>
      <p>You have clicked this button {count} times.</p>
      <button onClick={function () { return incrementMutation(countId, mutate, data && data.refetch);}}>
        Click Me
      </button>
    </div>
  );
}

function mapQueriesToProps() {
  return {
    data: {
      query: `
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

// This container brings in Apollo GraphQL data
const AppWithData = connect({mapQueriesToProps})
(App);

export default AppWithData;
