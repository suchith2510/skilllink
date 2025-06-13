const mongoose = require('mongoose');

    const questionSchema = new mongoose.Schema({
      skill: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
    });

    module.exports = mongoose.model('Question', questionSchema);