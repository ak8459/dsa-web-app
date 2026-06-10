import React from 'react';
import { Link } from 'react-router-dom';
import { BookCheck, LogOut } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-bg-card border-b border-border-color">
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <BookCheck className="text-brand-primary w-7 h-7" />
        <span className="text-xl font-bold tracking-tight text-text-primary">DSA Tracker</span>
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-text-primary">
          Hello, <strong>{user?.name || 'User'}</strong>
        </span>
        <button 
          className="bg-transparent border border-border-color text-text-secondary hover:border-border-hover hover:text-text-primary px-4 py-2 rounded-lg font-medium text-sm transition cursor-pointer flex items-center gap-1.5" 
          onClick={onLogout}
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
