import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/**
 * @desc   Comment schema for user interactions on videos.
 * @fields 
 *  - content: The comment text.
 *  - video: Reference to the commented video.
 *  - owner: The user who posted the comment.
 *  - timestamps: Tracks createdAt & updatedAt.
 */
const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Adds pagination support
commentSchema.plugin(mongooseAggregatePaginate);

// Export Comment Model
export const Comment = mongoose.model("Comment", commentSchema);
