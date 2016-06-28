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

function incrementCount(id, refetch) {
  return (dispatch, getState, client) => {
    client.mutate(generateMutationObject(id)).then((result) => {
      if (result.data) {
        dispatch({
          type: "UPDATE_COUNT",
          data: result.data.incrementCount
        });
        refetch();
      }
    });
  };
}

function fetchCounts() {
  return (dispatch, getState, client) => {
    client.query({
      query: gql`
          {
            counts {
              _id
              count
            },
          }
        `,
      forceFetch: true
    }).then((result) => {
      if (result) {
        dispatch({
          type: 'UPDATE_COUNT',
          data: result.data.counts.count
        });
      }
    });
  };
}

function composeAppComponent(Component) {
  return class extends React.Component {
    componentWillMount() {
      this.props.dispatch(fetchCounts());
    }
    render() {
      return <Component {...this.props} />
    }
  }
}


function App({ dispatch, data, reduxCount }) {
  const count = data && data.counts && data.counts.count;
  const countId = data && data.counts && data.counts._id;
  const refetch = data && data.refetch;
  return (
    <div>
      <p>The apollo store state for the count is {count}</p>
      <p>The Redux store state for the count is {reduxCount}</p>
      <button onClick={function () { return dispatch(incrementCount(countId, refetch));}}>
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

function mapStateToProps(state) {
  return {
    reduxCount: state.count
  };
}

// This container brings in Apollo GraphQL data
const AppWithData = connect({mapQueriesToProps, mapStateToProps})
(composeAppComponent(App));

export default AppWithData;
