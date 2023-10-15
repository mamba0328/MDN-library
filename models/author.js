const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

AuthorSchema.virtual("url").get( function (){
    return `/catalog/author/${this._id}`;
})

AuthorSchema.virtual("date_of_birth_formatted").get( function (){
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
})
AuthorSchema.virtual("date_of_death_formatted").get( function (){
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
})

AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toISODate() : ''// format 'YYYY-MM-DD'
});

AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toISODate() : ''// format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Author", AuthorSchema);
