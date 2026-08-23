import mongoose, { Schema } from 'mongoose';

const VisitorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    country: {
        name: {
            type: String,
            required: true,
        },
    },
    birthday: {
        type: Date,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
});

export const Visitor = mongoose.model('visitors', VisitorSchema);
