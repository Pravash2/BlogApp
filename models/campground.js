const mongoose=require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    comments:[
        {type:mongoose.Schema.Types.ObjectId},
        {ref:"Comment"}
    ],
    date: String
});
module.exports = mongoose.model("blog", blogSchema);