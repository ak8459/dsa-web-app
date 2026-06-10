import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import api from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import ProgressStats from '../components/ProgressStats.jsx';
import TopicCard from '../components/TopicCard.jsx';

export default function Home() {
  const { user, logout } = useAuth();
  const { completed, toggle } = useProgress();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedTopics, setExpandedTopics] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/topics')
      .then(r => {
        setTopics(r.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message || 'Failed to fetch topics');
        setLoading(false);
      });
  }, []);

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const toggleTopicExpand = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  let easyTotal = 0;
  let easySolved = 0;
  let mediumTotal = 0;
  let mediumSolved = 0;
  let toughTotal = 0;
  let toughSolved = 0;

  topics.forEach(topic => {
    topic.problems.forEach(prob => {
      const isDone = completed.has(prob._id);
      
      if (prob.difficulty === 'Easy') {
        easyTotal++;
        if (isDone) easySolved++;
      } else if (prob.difficulty === 'Medium') {
        mediumTotal++;
        if (isDone) mediumSolved++;
      } else if (prob.difficulty === 'Tough') {
        toughTotal++;
        if (isDone) toughSolved++;
      }
    });
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-10 h-10 border-3 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full pb-10 bg-bg-main text-text-primary">
      <Navbar user={user} onLogout={handleLogoutClick} />

      <main className="w-full max-w-[1200px] mx-auto px-5 py-6 flex flex-col gap-6 animate-fadeIn">
        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-lg text-sm font-medium mb-5 bg-danger/10 border border-danger/20 text-danger">
            <span>{error}</span>
          </div>
        )}

        <ProgressStats
          title="Overall Progress"
          titleIcon={Trophy}
          easySolved={easySolved}
          easyTotal={easyTotal}
          mediumSolved={mediumSolved}
          mediumTotal={mediumTotal}
          toughSolved={toughSolved}
          toughTotal={toughTotal}
          showGrid={true}
        />

        <section className="mt-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Layers className="text-brand-primary w-5 h-5" />
            Chapters & Categories
          </h3>

          {topics.map(topic => (
            <TopicCard
              key={topic._id}
              topic={topic}
              completed={completed}
              onToggleProblem={toggle}
              isExpanded={!!expandedTopics[topic._id]}
              onToggleExpand={() => toggleTopicExpand(topic._id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
