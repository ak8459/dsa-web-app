import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Code, Video, BookOpen, BookCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import api from '../api/axios.js';

export default function TopicDetailPage() {
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
        <nav className="flex justify-between items-center px-8 py-4 bg-bg-card border-b border-border-color">
          <div className="flex items-center gap-2.5">
            <BookCheck className="text-brand-primary w-7 h-7" />
            <span className="text-xl font-bold tracking-tight text-text-primary">DSA Tracker</span>
          </div>
        </nav>
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
  const completionPercentage = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

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

  const easyPercentage = easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0;
  const mediumPercentage = mediumTotal > 0 ? Math.round((mediumSolved / mediumTotal) * 100) : 0;
  const toughPercentage = toughTotal > 0 ? Math.round((toughSolved / toughTotal) * 100) : 0;
  
  // Topic-level status check
  const isTopicDone = totalCount > 0 && doneCount === totalCount;

  return (
    <div className="flex flex-col min-h-screen w-full pb-10 bg-bg-main text-text-primary">
      {/* Navigation Header */}
      <nav className="flex justify-between items-center px-8 py-4 bg-bg-card border-b border-border-color">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <BookCheck className="text-brand-primary w-7 h-7" />
          <span className="text-xl font-bold tracking-tight text-text-primary">DSA Tracker</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-text-primary">Hello, <strong>{user?.name}</strong></span>
          <button className="bg-transparent border border-border-color text-text-secondary hover:border-border-hover hover:text-text-primary px-4 py-2 rounded-lg font-medium text-sm transition cursor-pointer flex items-center gap-1.5" onClick={handleLogoutClick}>
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="w-full max-w-[1200px] mx-auto px-5 py-6 flex flex-col gap-6 animate-fadeIn">
        
        {/* Back Link */}
        <div className="flex">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-border-color text-text-secondary hover:border-border-hover hover:text-text-primary rounded-lg font-medium text-sm transition no-underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
        </div>

        {/* Stats card for the active Topic */}
        <section className="bg-bg-card border border-border-color rounded-xl p-6 flex flex-col gap-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-text-primary">
                  {topic.title}
                </h1>
                {/* Topic Level Status Indicator Badge */}
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
              <p className="text-sm text-text-secondary mt-1.5">
                {doneCount} of {totalCount} Problems Solved
              </p>
            </div>
            <span className="text-2xl font-bold text-brand-primary">{completionPercentage}%</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="grow h-3 rounded-full bg-bg-input overflow-hidden">
              <div 
                className="h-full bg-brand-primary rounded-full transition-all duration-300" 
                style={{ width: `${completionPercentage}%` }} 
              />
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 mt-1">
            {/* Easy Progress */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-success flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  Easy
                </span>
                <span className="text-text-secondary">
                  {easySolved} / {easyTotal} ({easyPercentage}%)
                </span>
              </div>
              <div className="grow h-2 rounded-full bg-bg-input overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-300" 
                  style={{ width: `${easyPercentage}%` }} 
                />
              </div>
            </div>

            {/* Medium Progress */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-warning flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-warning" />
                  Medium
                </span>
                <span className="text-text-secondary">
                  {mediumSolved} / {mediumTotal} ({mediumPercentage}%)
                </span>
              </div>
              <div className="grow h-2 rounded-full bg-bg-input overflow-hidden">
                <div 
                  className="h-full bg-warning rounded-full transition-all duration-300" 
                  style={{ width: `${mediumPercentage}%` }} 
                />
              </div>
            </div>

            {/* Hard Progress */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-danger flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-danger" />
                  Hard
                </span>
                <span className="text-text-secondary">
                  {toughSolved} / {toughTotal} ({toughPercentage}%)
                </span>
              </div>
              <div className="grow h-2 rounded-full bg-bg-input overflow-hidden">
                <div 
                  className="h-full bg-danger rounded-full transition-all duration-300" 
                  style={{ width: `${toughPercentage}%` }} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problems list */}
        <section className="bg-bg-card border border-border-color rounded-xl overflow-hidden">
          <div className="bg-bg-main/30">
            {topic.problems.map((prob) => {
              const isSolved = completed.has(prob._id);

              return (
                <div key={prob._id} className="flex items-center justify-between px-6 py-3.5 border-b border-border-color last:border-b-0 hover:bg-bg-input/20 transition max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3 max-[480px]:p-4" style={{ background: isSolved ? 'rgba(16, 185, 129, 0.03)' : 'transparent' }}>
                  <div className="flex items-center gap-4 grow">
                    <input
                      type="checkbox"
                      className="w-4.5 h-4.5 accent-success cursor-pointer"
                      checked={isSolved}
                      onChange={() => toggle(prob._id)}
                    />
                    <span className={`text-sm font-medium ${isSolved ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                      {prob.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 max-[480px]:w-full max-[480px]:justify-between max-[480px]:pl-[34px]">
                    {/* Difficulty Badge */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      prob.difficulty === 'Easy' 
                        ? 'bg-success/15 text-success border-success/30' 
                        : prob.difficulty === 'Medium' 
                        ? 'bg-warning/15 text-warning border-warning/30' 
                        : 'bg-danger/15 text-danger border-danger/30'
                    }`}>
                      {prob.difficulty === 'Tough' ? 'Hard' : prob.difficulty}
                    </span>

                    {/* Subtopic Status badge */}
                    <span 
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider w-[70px] text-center ${
                        isSolved 
                          ? 'bg-success/15 text-success border-success/30' 
                          : 'bg-danger/15 text-danger border-danger/30'
                      }`}
                    >
                      {isSolved ? 'Done' : 'Pending'}
                    </span>

                    {/* Links */}
                    <div className="flex gap-2">
                      {prob.leetcodeUrl && (
                        <a
                          href={prob.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-bg-input border border-border-color text-text-secondary hover:text-warning hover:bg-warning/10 hover:border-warning/30 transition no-underline"
                          title="Practice (LeetCode / Codeforces)"
                        >
                          <Code className="w-4 h-4" />
                        </a>
                      )}
                      {prob.youtubeUrl && (
                        <a
                          href={prob.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-bg-input border border-border-color text-text-secondary hover:text-danger hover:bg-danger/10 hover:border-danger/30 transition no-underline"
                          title="Watch Video Solution"
                        >
                          <Video className="w-4 h-4" />
                        </a>
                      )}
                      {prob.articleUrl && (
                        <a
                          href={prob.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-bg-input border border-border-color text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary/30 transition no-underline"
                          title="Read Editorial Article"
                        >
                          <BookOpen className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
