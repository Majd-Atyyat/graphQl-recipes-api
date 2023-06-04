const { gql } = require('apollo-server');

module.exports = gql`
  # The Recipe type represents a recipe object
  type Recipe {
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }

  # The RecipeInput type represents the input for creating or editing a recipe
  input RecipeInput {
    name: String
    description: String
  }

  # The Query type represents the available queries
  type Query {
    # Get a recipe by its ID
    recipe(ID: ID!): Recipe!
    # Get a list of recipes with the specified amount
    getRecipes(amount: Int): [Recipe]
  }

  # The Mutation type represents the available mutations
  type Mutation {
    # Create a new recipe
    createRecipe(recipeInput: RecipeInput): Recipe!
    # Delete a recipe by its ID
    deleteRecipe(ID: ID!): Boolean
    # Edit a recipe by its ID
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
  }
`;
