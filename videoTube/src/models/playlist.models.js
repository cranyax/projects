import mongoose, { Schema } from "mongoose";

/**
 * @desc   Playlist schema for organizing videos.
 * @fields 
 *  - name: Name of the playlist.
 *  - description: Playlist description.
 *  - videos: Array of video references.
 *  - owner: The user who created the playlist.
 *  - timestamps: Tracks createdAt & updatedAt.
 */
const playlistSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        videos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Export Playlist Model
export const Playlist = mongoose.model("Playlist", playlistSchema);
