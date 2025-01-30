import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/**
 * @desc   Video schema storing uploaded video details.
 * @fields 
 *  - videoFile: Cloud-hosted video URL.
 *  - thumbnail: Thumbnail image URL.
 *  - title: Video title.
 *  - description: Brief description of the video.
 *  - views: View count (default 0).
 *  - duration: Video length in seconds.
 *  - isPublished: Boolean flag to control video visibility.
 *  - owner: References User model (video creator).
 *  - timestamps: Tracks createdAt & updatedAt.
 */
const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        duration: {
            type: Number,
            required: true,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

// Adds pagination support to the Video model
videoSchema.plugin(mongooseAggregatePaginate);

// Export Video Model
export const Video = mongoose.model("Video", videoSchema);
