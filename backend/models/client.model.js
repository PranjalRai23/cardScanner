import mongoose, {Schema} from "mongoose";

const clientSchema = new Schema(
    {
        name: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
        company: {
            type: String,
        },
        email: {
            type: String,
            lowecase: true,
            trim: true, 
        },
        phoneNumber: {
            type: Number,
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

export const Client = mongoose.model("Client", clientSchema)