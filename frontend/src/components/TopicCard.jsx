import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, ChevronRight, ChevronDown } from 'lucide-react';
import ProblemRow from './ProblemRow.jsx';

export default function TopicCard({ 
  topic, 
  completed, 
  onToggleProblem, 
  isExpanded, 
  onToggleExpand 
}) {
  const topicProblemsCount = topic.problems.length;
  const topicCompletedCount = topic.problems.filter(p => completed.has(p._id)).length;
  const isTopicDone = topicProblemsCount > 0 && topicCompletedCount === topicProblemsCount;

  return (
    <div className="bg-bg-card border border-border-color rounded-xl overflow-hidden mb-4 transition">
      <div 
        className="flex justify-between items-center p-4 bg-bg-card/40 hover:bg-bg-card/80 transition cursor-pointer select-none"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-4.5 h-4.5 text-brand-primary" />
          <span className="text-base font-semibold text-text-primary">{topic.title}</span>
          <span 
            className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
              isTopicDone 
                ? 'bg-success/15 text-success border-success/30' 
                : 'bg-danger/15 text-danger border-danger/30'
            }`}
          >
            {isTopicDone ? 'Done' : 'Pending'}
          </span>
        </div>
        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <span className="text-xs font-semibold text-text-secondary bg-bg-input px-2.5 py-1 rounded-full">
            {topicCompletedCount} / {topicProblemsCount} Solved
          </span>
          <Link 
            to={`/topics/${topic._id}`} 
            className="inline-flex items-center justify-center w-7 h-7 rounded bg-bg-input border border-border-color text-text-secondary hover:text-text-primary hover:border-border-hover transition no-underline"
            title="Topic Details"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button 
            onClick={onToggleExpand}
            className="bg-transparent border-none cursor-pointer flex items-center p-1"
          >
            {isExpanded ? (
              <ChevronDown className="w-4.5 h-4.5 text-text-secondary" />
            ) : (
              <ChevronRight className="w-4.5 h-4.5 text-text-secondary" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border-color bg-bg-main/30">
          {topicProblemsCount === 0 ? (
            <div className="p-4 text-center text-text-secondary text-sm">
              No problems listed under this topic.
            </div>
          ) : (
            topic.problems.map(prob => (
              <ProblemRow 
                key={prob._id}
                problem={prob}
                isSolved={completed.has(prob._id)}
                onToggle={onToggleProblem}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
