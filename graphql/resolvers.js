const Recipe = require('../models/Recipe');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


const secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    secretKey,
    { expiresIn: '1h' }
  );
};

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }, context) {
      // Verify the user's authentication
       auth(context);
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });
      const res = await createdRecipe.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { ID }, context) {
      // Verify the user's authentication
      auth(context);
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      // 1 if something is deleted, 0 if nothing is deleted
      return wasDeleted;
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }, context) {
      // Verify the user's authentication
       auth(context);
      const wasEdited = (await Recipe.updateOne(
        { _id: ID },
        { name: name, description: description }
      )).modifiedCount;
      // 1 if something is modified, 0 if nothing is modified
      return wasEdited;
    },
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // TODO: Validate input data (e.g., password length, email format, etc.)

      // Check if a user with the same username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new Error('Username or email is already taken.');
      }

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Save the new user to the database
      const res = await newUser.save();

      // Generate and return a token for the registered user
      const token = generateToken(res);

      // Return the user data without the password
      return {
        id: res.id,
        ...res._doc,
        password: null,
        token,
      };
    },
    async login(_, { loginInput: { username, password } }) {
      // Check if a user with the provided username exists
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found.');
      }

      // TODO: Implement password validation (e.g., using bcrypt)

      // For now, we'll do a simple password check
      if (user.password !== password) {
        throw new Error('Invalid password.');
      }

      // Generate and return a token for the logged-in user
      const token = generateToken(user);

      // Return the user data without the password
      return {
        id: user.id,
        ...user._doc,
        password: null,
        token,
      };
    },
  },
};
