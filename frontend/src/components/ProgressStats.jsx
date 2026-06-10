import React from 'react';

export default function ProgressStats({
  title,
  titleIcon: TitleIcon,
  subtitle,
  easySolved = 0,
  easyTotal = 0,
  mediumSolved = 0,
  mediumTotal = 0,
  toughSolved = 0,
  toughTotal = 0,
  showGrid = false
}) {
  const easyPercentage = easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0;
  const mediumPercentage = mediumTotal > 0 ? Math.round((mediumSolved / mediumTotal) * 100) : 0;
  const toughPercentage = toughTotal > 0 ? Math.round((toughSolved / toughTotal) * 100) : 0;

  const completedCount = easySolved + mediumSolved + toughSolved;
  const totalProblemsCount = easyTotal + mediumTotal + toughTotal;
  const overallPercentage = totalProblemsCount > 0 
    ? Math.round((completedCount / totalProblemsCount) * 100) 
    : 0;

  return (
    <section className="bg-bg-card border border-border-color rounded-xl p-6 flex flex-col gap-5">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-text-primary">
            {TitleIcon && <TitleIcon className="text-warning w-5.5 h-5.5" />}
            {title}
          </h2>
          {subtitle && (
            <div className="text-sm text-text-secondary">
              {subtitle}
            </div>
          )}
        </div>
        <span className="text-2xl font-bold text-brand-primary">{overallPercentage}%</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="grow h-3 rounded-full bg-bg-input overflow-hidden">
          <div 
            className="h-full bg-brand-primary rounded-full transition-all duration-300" 
            style={{ width: `${overallPercentage}%` }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 mt-1">
        {/* Easy Category */}
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

        {/* Medium Category */}
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

        {/* Hard Category */}
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

      {showGrid && (
        <div className="grid grid-cols-4 gap-4 max-[768px]:grid-cols-2 mt-2">
          <div className="bg-bg-input border border-border-color rounded-lg p-3 text-center">
            <div className="text-xl font-bold mb-0.5 text-brand-primary">
              {completedCount} / {totalProblemsCount}
            </div>
            <div className="text-[11px] text-text-secondary font-semibold uppercase">Total Solved</div>
          </div>
          <div className="bg-bg-input border border-border-color rounded-lg p-3 text-center">
            <div className="text-xl font-bold mb-0.5 text-success">
              {easySolved} / {easyTotal}
            </div>
            <div className="text-[11px] text-text-secondary font-semibold uppercase">Easy</div>
          </div>
          <div className="bg-bg-input border border-border-color rounded-lg p-3 text-center">
            <div className="text-xl font-bold mb-0.5 text-warning">
              {mediumSolved} / {mediumTotal}
            </div>
            <div className="text-[11px] text-text-secondary font-semibold uppercase">Medium</div>
          </div>
          <div className="bg-bg-input border border-border-color rounded-lg p-3 text-center">
            <div className="text-xl font-bold mb-0.5 text-danger">
              {toughSolved} / {toughTotal}
            </div>
            <div className="text-[11px] text-text-secondary font-semibold uppercase">Tough</div>
          </div>
        </div>
      )}
    </section>
  );
}
