import Topic from '../models/Topic.js';
import User from '../models/User.js';

export const getTopics = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const progressSet = new Set(
      user ? user.progress.map(p => p.problemId.toString()) : []
    );

    const topics = await Topic.find().sort({ order: 1 });
    
    const topicsWithStatus = topics.map(topic => {
      const topicObj = topic.toObject();
      let allProblemsDone = topicObj.problems.length > 0;

      // Attach status to each individual problem
      topicObj.problems = topicObj.problems.map(prob => {
        const isDone = progressSet.has(prob._id.toString());
        if (!isDone) {
          allProblemsDone = false;
        }
        return {
          ...prob,
          status: isDone ? 'Done' : 'Pending'
        };
      });

      // Attach status to the topic overall
      topicObj.status = allProblemsDone ? 'Done' : 'Pending';
      return topicObj;
    });

    res.json(topicsWithStatus);
  } catch (error) {
    next(error);
  }
};

export const getTopicById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const progressSet = new Set(
      user ? user.progress.map(p => p.problemId.toString()) : []
    );

    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const topicObj = topic.toObject();
    let allProblemsDone = topicObj.problems.length > 0;

    // Attach status to each individual problem
    topicObj.problems = topicObj.problems.map(prob => {
      const isDone = progressSet.has(prob._id.toString());
      if (!isDone) {
        allProblemsDone = false;
      }
      return {
        ...prob,
        status: isDone ? 'Done' : 'Pending'
      };
    });

    // Attach status to the topic overall
    topicObj.status = allProblemsDone ? 'Done' : 'Pending';

    res.json(topicObj);
  } catch (error) {
    next(error);
  }
};
