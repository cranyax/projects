import mongoose, { Schema } from "mongoose";

/**
 * @desc   Subscription schema to track user channel subscriptions.
 * @fields 
 *  - subscriber: The user who is subscribing.
 *  - channel: The user being subscribed to.
 *  - timestamps: Tracks createdAt & updatedAt.
 */
const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        channel: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Export Subscription Model
export const Subscription = mongoose.model("Subscription", subscriptionSchema);
