import React from 'react';
import { Code, Video, BookOpen } from 'lucide-react';

export default function ProblemRow({ problem, isSolved, onToggle }) {
  const { _id, title, difficulty, leetcodeUrl, youtubeUrl, articleUrl } = problem;

  return (
    <div 
      className="flex items-center justify-between px-6 py-3.5 border-b border-border-color last:border-b-0 hover:bg-bg-input/20 transition max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3 max-[480px]:p-4" 
      style={{ background: isSolved ? 'rgba(16, 185, 129, 0.03)' : 'transparent' }}
    >
      <div className="flex items-center gap-4 grow">
        <input
          type="checkbox"
          className="w-4.5 h-4.5 accent-success cursor-pointer"
          checked={isSolved}
          onChange={() => onToggle(_id)}
        />
        <span className={`text-sm font-medium ${isSolved ? 'line-through text-text-muted' : 'text-text-primary'}`}>
          {title}
        </span>
      </div>

      <div className="flex items-center gap-5 max-[480px]:w-full max-[480px]:justify-between max-[480px]:pl-[34px]">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
          difficulty === 'Easy' 
            ? 'bg-success/15 text-success border-success/30' 
            : difficulty === 'Medium' 
            ? 'bg-warning/15 text-warning border-warning/30' 
            : 'bg-danger/15 text-danger border-danger/30'
        }`}>
          {difficulty === 'Tough' ? 'Hard' : difficulty}
        </span>

        <span 
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider w-[70px] text-center ${
            isSolved 
              ? 'bg-success/15 text-success border-success/30' 
              : 'bg-danger/15 text-danger border-danger/30'
          }`}
        >
          {isSolved ? 'Done' : 'Pending'}
        </span>

        <div className="flex gap-2">
          {leetcodeUrl && (
            <a 
              href={leetcodeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-8 h-8 rounded bg-bg-input border border-border-color text-text-secondary hover:text-warning hover:bg-warning/10 hover:border-warning/30 transition no-underline"
              title="Practice (LeetCode / Codeforces)"
            >
              <Code className="w-4 h-4" />
            </a>
          )}
          {youtubeUrl && (
            <a 
              href={youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-8 h-8 rounded bg-bg-input border border-border-color text-text-secondary hover:text-danger hover:bg-danger/10 hover:border-danger/30 transition no-underline"
              title="Watch Video Solution"
            >
              <Video className="w-4 h-4" />
            </a>
          )}
          {articleUrl && (
            <a 
              href={articleUrl} 
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
}
