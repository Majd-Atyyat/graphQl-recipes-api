const {model,Schema}=require('mongoose');

// Define the schema for the Recipe collection
const recipeSchema =new Schema({
    name: String,
    description: String,
    createdAt: String,
    thumbsUp: Number,
    thumbsDown: Number,



});
// Create a model for the Recipe collection using the schema
module.exports =model('Recipe', recipeSchema);