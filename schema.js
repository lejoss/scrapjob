const graphql = require("graphql");
const resolvers = require("./resolvers");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema
} = graphql;

const url =
  "https://www.computrabajo.com.co/ofertas-de-trabajo/?q=Inform%C3%A1tica&prov=20";

const JobType = new GraphQLObjectType({
  name: "Job",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    jobs: {
      type: new GraphQLList(JobType),
      resolve() {
        return resolvers.getJobs().then(function(jobs) {
          return jobs;
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
