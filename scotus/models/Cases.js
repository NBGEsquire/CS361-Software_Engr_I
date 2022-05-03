const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CaseFields = new Schema({ 
  name: { type: [String] },
  term: String,
  question: { type: [String], trim: true },
  description: { type: [String] }
});

const Cases = mongoose.model('Cases', CaseFields, 'CaseSchema');

module.exports = Cases
