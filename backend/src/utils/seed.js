import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic.js';

dotenv.config();

const topics = [
  {
    title: 'Arrays', order: 1,
    problems: [
      {
        title: 'Two Sum', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/two-sum',
        youtubeUrl: 'https://youtu.be/KLlXCFG5TnA',
        articleUrl: 'https://www.geeksforgeeks.org/two-sum-problem/'
      },
      {
        title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock'
      },
      {
        title: 'Maximum Subarray (Kadane\'s)', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray'
      },
      {
        title: '3Sum', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/3sum'
      },
      {
        title: 'Trapping Rain Water', difficulty: 'Tough',
        leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water'
      },
    ]
  },
  {
    title: 'Linked Lists', order: 2,
    problems: [
      {
        title: 'Reverse a Linked List', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list'
      },
      {
        title: 'Detect Cycle in Linked List', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle'
      },
      {
        title: 'Merge Two Sorted Lists', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists'
      },
      {
        title: 'LRU Cache', difficulty: 'Tough',
        leetcodeUrl: 'https://leetcode.com/problems/lru-cache'
      },
    ]
  },
  {
    title: 'Binary Trees', order: 3,
    problems: [
      {
        title: 'Inorder Traversal', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal'
      },
      {
        title: 'Maximum Depth of Binary Tree', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree'
      },
      {
        title: 'Level Order Traversal (BFS)', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal'
      },
      {
        title: 'Diameter of Binary Tree', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree'
      },
      {
        title: 'Serialize and Deserialize Binary Tree', difficulty: 'Tough',
        leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree'
      },
    ]
  },
  {
    title: 'Dynamic Programming', order: 4,
    problems: [
      {
        title: 'Climbing Stairs', difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs'
      },
      {
        title: 'Coin Change', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/coin-change'
      },
      {
        title: 'Longest Common Subsequence', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence'
      },
      {
        title: 'Edit Distance', difficulty: 'Tough',
        leetcodeUrl: 'https://leetcode.com/problems/edit-distance'
      },
    ]
  },
  {
    title: 'Graphs', order: 5,
    problems: [
      {
        title: 'Number of Islands (BFS/DFS)', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/number-of-islands'
      },
      {
        title: 'Course Schedule (Topological Sort)', difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/course-schedule'
      },
      {
        title: "Dijkstra's Shortest Path", difficulty: 'Tough',
        articleUrl: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/'
      },
    ]
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  await Topic.deleteMany({});
  await Topic.insertMany(topics);
  console.log('✅ Seeded', topics.length, 'topics');
  process.exit(0);
}

seed().catch(console.error);
