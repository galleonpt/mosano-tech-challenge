import mongoose, { Schema } from 'mongoose';

const CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

export const Country = mongoose.model('countries', CountrySchema);
