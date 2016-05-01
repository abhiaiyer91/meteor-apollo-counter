import { Random } from 'meteor/random';

export default schema = [`
type Count {
  _id: String
  count: String
  updatedAt: String
}
type Query {
  counts: Count
}
type Mutation {
  incrementCount(id: String): String
}
schema {
  query: Query
  mutation: Mutation
}
`];
