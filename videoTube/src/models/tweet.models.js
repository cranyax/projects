import mongoose, { Schema } from "mongoose";

/**
 * @desc   Tweet schema for storing short text posts.
 * @fields 
 *  - content: The tweet's text.
 *  - owner: The user who posted the tweet.
 *  - timestamps: Tracks createdAt & updatedAt.
 */
const tweetSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Export Tweet Model
export const Tweet = mongoose.model("Tweet", tweetSchema);
