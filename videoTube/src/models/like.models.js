import mongoose, { Schema } from "mongoose";

/**
 * @desc   Like schema to track user interactions.
 * @fields 
 *  - video: Video that was liked (if applicable).
 *  - comment: Comment that was liked (if applicable).
 *  - tweet: Tweet that was liked (if applicable).
 *  - likedBy: The user who liked the content.
 *  - timestamps: Tracks createdAt & updatedAt.
 */
const likeSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Export Like Model
export const Like = mongoose.model("Like", likeSchema);
