import mongoose from 'mongoose';

// problem schema
const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Tough'],
    required: true
  },
  youtubeUrl: {
    type: String,
    trim: true
  },
  leetcodeUrl: {
    type: String,
    trim: true
  },
  articleUrl: {
    type: String,
    trim: true
  }
});

// topic Schema
const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    required: true,
    unique: true
  },
  problems: [problemSchema]
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
