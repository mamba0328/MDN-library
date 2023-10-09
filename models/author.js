const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: Schema.Types.String, required:true, maxLength:100, },
    family_name: {type: Schema.Types.String, required:true, maxLength:100, },
    date_of_birth: {type: Schema.Types.Date},
    date_of_death: {type: Schema.Types.Date}
})

// Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB.

AuthorSchema.virtual("name").get( function () {
    return `${this.first_name ?? ''} ${this.family_name ?? ''}`;
})

AuthorSchema.virtual("url").get(() => {
    return `/catalog/author/${this._id}`;
})

module.exports = mongoose.model("Author", AuthorSchema);
