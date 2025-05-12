const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model defined elsewhere
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    // Timestamps for creation and last update
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the 'updatedAt' field before saving
articleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Indexing for frequently queried fields
articleSchema.index({ title: 'text', content: 'text' }); // Example of text index for searching
articleSchema.index({ author: 1 }); // Example of single field index
articleSchema.index({ tags: 1 }); // Example of array index
articleSchema.index({ createdAt: -1 }); // Example of descending order index

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;

