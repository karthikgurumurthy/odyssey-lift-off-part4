const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core')
const { bootstrap: bootstrapGlobalAgent } = require('global-agent')

const TrackAPI = require('./datasources/track-api')

bootstrapGlobalAgent()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      trackAPI: new TrackAPI(),
    }
  },
})

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
  `)
})
