import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Counts from '/imports/data/collection';
const Users = Meteor.users;
const Notes = new Mongo.Collection('notes');

export default resolvers = {
  Query: {
    async counts() {
      return Counts.findOne();
    }
  },
  Mutation: {
    async incrementCount(_, { id }) {
      return Counts.update({_id: id}, {
        $inc: {count: 1},
        $set: {
          updatedAt: new Date()
        }
      });
    }
  }
}
