import mongoose, { Schema } from "mongoose";

/**
 * @desc   User schema representing platform users.
 * @fields 
 *  - username: Unique identifier for the user (lowercased & indexed).
 *  - email: Unique email for authentication.
 *  - fullname: Full name of the user (indexed for search).
 *  - avatar: Profile picture (stored as a URL).
 *  - coverImage: Optional cover image (stored as a URL).
 *  - watchHistory: List of watched videos (references Video model).
 *  - password: Hashed password for authentication.
 *  - refreshToken: JWT refresh token storage for authentication.
 *  - timestamps: Automatically records createdAt & updatedAt.
 */
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Export User Model
export const User = mongoose.model("User", userSchema);
