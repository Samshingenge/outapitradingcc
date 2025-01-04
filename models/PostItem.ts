import mongoose from "mongoose";

const postItemSchema = new mongoose.Schema(
    {
        img:{ type: String, required: true },
        category: {type: String, required: true },
        date: { type: Date, default: Date.now},
        title: {type: String, required: true },
        brief: {type: String, default: null },
        avatar: {type: String, default:null},
        author: {type: String, default:null},
        top: {type: Boolean, default:false},
        trending: {type: Boolean, default:false},
    },
    {
        timestamps: true,
    }
);

const PostItem = mongoose.models.postItem || mongoose.model('postItem',postItemSchema);

export default PostItem;


//https://res.cloudinary.com/dctsmolrb/image/upload/v1733208494/dh0krch7uiray4eslknv.png