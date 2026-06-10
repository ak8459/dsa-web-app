import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import api from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import ProgressStats from '../components/ProgressStats.jsx';
import ProblemRow from '../components/ProblemRow.jsx';

export default function TopicDetails() {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const { completed, toggle } = useProgress();
  
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError('');
    api.get(`/topics/${id}`)
      .then(r => {
        setTopic(r.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message || 'Failed to fetch topic details');
        setLoading(false);
      });
  }, [id]);

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-10 h-10 border-3 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Loading topic details...</p>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="flex flex-col min-h-screen w-full pb-10 bg-bg-main text-text-primary">
        <Navbar user={user} onLogout={handleLogoutClick} />
        <div className="w-full max-w-[1200px] mx-auto px-5 py-12 text-center flex flex-col items-center justify-center">
          <AlertCircle className="text-danger w-12 h-12 mb-4" />
          <h3 className="text-lg font-bold">Failed to load topic</h3>
          <p className="text-text-secondary text-sm mt-2 mb-6">{error || 'Topic not found'}</p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-border-color text-text-secondary hover:border-border-hover hover:text-text-primary rounded-lg font-medium text-sm transition no-underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const doneCount = topic.problems.filter(p => completed.has(p._id)).length;
  const totalCount = topic.problems.length;
  const isTopicDone = totalCount > 0 && doneCount === totalCount;

  let easyTotal = 0;
  let easySolved = 0;
  let mediumTotal = 0;
  let mediumSolved = 0;
  let toughTotal = 0;
  let toughSolved = 0;

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

  const titleNode = (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold text-text-primary">{topic.title}</span>
      <span 
        className={`text-xs font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${
          isTopicDone 
            ? 'bg-success/15 text-success border-success/30' 
            : 'bg-danger/15 text-danger border-danger/30'
        }`}
      >
        {isTopicDone ? 'Done' : 'Pending'}
      </span>
    </div>
  );

  const subtitleNode = (
    <span className="text-sm text-text-secondary">
      {doneCount} of {totalCount} Problems Solved
    </span>
  );

  return (
    <div className="flex flex-col min-h-screen w-full pb-10 bg-bg-main text-text-primary">
      <Navbar user={user} onLogout={handleLogoutClick} />

      <main className="w-full max-w-[1200px] mx-auto px-5 py-6 flex flex-col gap-6 animate-fadeIn">
        <div className="flex">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-border-color text-text-secondary hover:border-border-hover hover:text-text-primary rounded-lg font-medium text-sm transition no-underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
        </div>

        <ProgressStats
          title={titleNode}
          subtitle={subtitleNode}
          easySolved={easySolved}
          easyTotal={easyTotal}
          mediumSolved={mediumSolved}
          mediumTotal={mediumTotal}
          toughSolved={toughSolved}
          toughTotal={toughTotal}
          showGrid={false}
        />

        <section className="bg-bg-card border border-border-color rounded-xl overflow-hidden">
          <div className="bg-bg-main/30">
            {topic.problems.map((prob) => (
              <ProblemRow
                key={prob._id}
                problem={prob}
                isSolved={completed.has(prob._id)}
                onToggle={toggle}
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
