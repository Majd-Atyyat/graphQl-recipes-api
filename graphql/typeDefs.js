const { gql } = require('apollo-server');

module.exports = gql`
  type Recipe {
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }

  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    token: String!
  }

  input RecipeInput {
    name: String
    description: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`;
