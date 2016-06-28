import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Counts from '/imports/data/collection';

export default resolvers = {
  Query: {
    async counts() {
      return Counts.findOne({}, {
        fields: {
          _id: 1,
          count: 1
        }
      });
    }
  },
  Mutation: {
    async incrementCount(_, { id }) {
      Counts.update({_id: id}, {
        $inc: {count: 1},
        $set: {
          updatedAt: new Date()
        }
      });
      return Counts.findOne({}, {
        fields: {
          _id: 1,
          count: 1
        }
      }).count;
    }
  }
}
