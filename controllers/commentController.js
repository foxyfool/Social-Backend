// import model 
const Post = require("../model/postModel");
const Comment = require("../model/commentModel");

//business logic async as connection with db
exports.createComment = async (req,res) =>{
    //save function create object comment 
    try{
        //fetch data from req body
        const{post,user,body} = req.body;
        //create a comment object 
        const comment = new Comment({
            post,user,body
        });
        // save the new obj into the DB
        const savedComment = await comment.save()

        // find the post by id , add the new comment to its array
        // push - entry update pull- delete entry 
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}},{new:true})
        .populate("comments") //fetch the actual conetent of the comments !
        .exec()
        res.json({
            post:updatedPost
        });
    }catch(error){
        return res.status(500).json({
            error:"Error while creating comment!"
        })
    }
}