import { Schema } from "mongoose";

const productSchema = new Schema(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default productSchema;
