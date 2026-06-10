import mongoose from 'mongoose';
import User from '../models/User.js';

export const getProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const formattedProgress = user.progress.map(item => ({
      problemId: item.problemId
    }));
    res.json(formattedProgress);
  } catch (error) {
    next(error);
  }
};

export const markCompleted = async (req, res, next) => {
  try {
    const { problemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(problemId)) {
      return res.status(400).json({ message: 'Invalid problem ID format' });
    }

    const user = await User.findById(req.user.id);
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

export const unmarkCompleted = async (req, res, next) => {
  try {
    const { problemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(problemId)) {
      return res.status(400).json({ message: 'Invalid problem ID format' });
    }

    const user = await User.findById(req.user.id);
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
