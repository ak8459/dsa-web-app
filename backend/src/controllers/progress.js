import mongoose from 'mongoose';
import User from '../models/User.js';

// controller function to get progress
export const getProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log('cehck data', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const formattedProgress = user.progress.map(item => ({
      problemId: item.problemId
    }));
    console.log('line 16', formattedProgress);

    res.json(formattedProgress);
  } catch (error) {
    next(error);
  }
};

// controller function to get completed 
export const markCompleted = async (req, res, next) => {
  try {
    const { problemId } = req.params;
    // console.log(problemId);

    if (!mongoose.Types.ObjectId.isValid(problemId)) {
      return res.status(400).json({ message: 'Invalid problem ID format' });
    }

    const user = await User.findById(req.user.id);
    // console.log('line 35', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyCompleted = user.progress.some(
      item => item.problemId.toString() === problemId
    );

    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Problem is already completed' });
    }

    user.progress.push({ problemId });
    await user.save();

    res.json({ message: 'Problem marked as completed' });
  } catch (error) {
    next(error);
  }
};

// get unmarkedCompleted
export const unmarkCompleted = async (req, res, next) => {
  try {
    const { problemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(problemId)) {
      return res.status(400).json({ message: 'Invalid problem ID format' });
    }

    const user = await User.findById(req.user.id);
    // console.log('user',user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progressLengthBefore = user.progress.length;
    user.progress = user.progress.filter(
      item => item.problemId.toString() !== problemId
    );

    if (user.progress.length === progressLengthBefore) {
      return res.status(404).json({ message: 'Problem was not marked as completed' });
    }

    await user.save();

    res.json({ message: 'Problem progress removed' });
  } catch (error) {
    next(error);
  }
};
