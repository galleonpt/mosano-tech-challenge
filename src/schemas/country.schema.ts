import mongoose, { Schema } from 'mongoose';

const CountrySchema = new Schema({
    name: String,
});

export const Country = mongoose.model('countries', CountrySchema);
