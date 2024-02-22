const Post = require("../model/postModel");
const Like = require("../model/likeModel")

// like a post 
exports.likePost = async (req,res)=>{
    try{
        const {post,user} = req.body;
        const like = new Like({
            post,user,
        })
        const savedLike = await like.save();

        // post collection update 

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true}).populate("likes").exec();

        res.json({
            post:updatedPost,
        })
    }catch(error){
        return res.status(400).json({
            error:"Error while liking Post",
        })
    }
}
// unlike a post 
exports.unlike = async (req,res)=>{
    try{
        const {post,like} = req.body;
        // find and deleted
        const unlike = await Like.findOneAndDelete({post:post,_id:like});

        //update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post,
                                                        {$pull:{likes:unlike._id}},
                                                        {new:true});

        res.json({
            post:updatedPost,
        });
    }catch(error){
        return res.status(400).json({
            error:"Error while unliking Post",
        })
    }
}
