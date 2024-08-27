import mongoose from "mongoose";

const articleModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Artykuł musi posiadać nazwę'],
        unique: [true],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Artykuł musi posiadać kategorię'],
        trim: true
    },
    mainPhoto: {
        type: String,
        required: [true, 'Artykuł musi posiadać główne zdjęcie']
    },
    content: {
        type: String,
        required: [true, 'Artykuł musi posiadać kontent'],
    },
    author: {
        type: String,
        required: [true, 'Artykuł musi posiadać autora'],
    },
}, {
    timestamps: {createdAt: 'createdAt'}
})

const Article = mongoose.model('Article', articleModel);

export default Article