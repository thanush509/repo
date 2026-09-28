import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { JobFilters as FiltersType } from '../../stores/useJobStore';

interface JobFiltersProps {
  filters: FiltersType;
  onChange: (filters: Partial<FiltersType>) => void;
  onReset: () => void;
  totalCount: number;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
}) => {
  const isFiltered =
    filters.search !== '' ||
    filters.role !== 'all' ||
    filters.location !== 'all' ||
    filters.workMode !== 'all' ||
    filters.minMatchScore > 0;

  return (
    <div className="bg-white border border-zinc-200/80 rounded-xl p-3.5 sm:p-4 space-y-3 shadow-xs">
      {/* Top row: Search input + Results summary */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Filter by title, company, or skill (e.g. HCC, CPC)..."
            className="w-full bg-zinc-50 border border-zinc-200/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-zinc-500">
          <span>
            Showing <strong className="text-zinc-900 font-semibold">{totalCount}</strong> matching jobs
          </span>
          {isFiltered && (
            <button
              onClick={onReset}
              className="text-xs text-zinc-500 hover:text-zinc-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Filter Selects */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-100">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        {/* Role */}
        <select
          value={filters.role}
          onChange={(e) => onChange({ role: e.target.value })}
          className="bg-zinc-50 border border-zinc-200/80 rounded-md px-2.5 py-1 text-xs text-zinc-700 hover:border-zinc-300 focus:outline-none cursor-pointer"
        >
          <option value="all">All Roles</option>
          <option value="HCC">HCC Coder</option>
          <option value="Medical Coder">Medical Coder</option>
          <option value="Risk Adjustment">Risk Adjustment</option>
          <option value="Analyst">Analyst</option>
          <option value="Billing">Billing</option>
        </select>

        {/* Location */}
        <select
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          className="bg-zinc-50 border border-zinc-200/80 rounded-md px-2.5 py-1 text-xs text-zinc-700 hover:border-zinc-300 focus:outline-none cursor-pointer"
        >
          <option value="all">All Locations</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Remote">Remote</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        {/* Work Mode */}
        <select
          value={filters.workMode}
          onChange={(e) => onChange({ workMode: e.target.value })}
          className="bg-zinc-50 border border-zinc-200/80 rounded-md px-2.5 py-1 text-xs text-zinc-700 hover:border-zinc-300 focus:outline-none cursor-pointer"
        >
          <option value="all">All Work Modes</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>

        {/* Match Score */}
        <select
          value={filters.minMatchScore}
          onChange={(e) => onChange({ minMatchScore: Number(e.target.value) })}
          className="bg-zinc-50 border border-zinc-200/80 rounded-md px-2.5 py-1 text-xs text-zinc-700 hover:border-zinc-300 focus:outline-none cursor-pointer"
        >
          <option value={0}>Any Match Score</option>
          <option value={80}>80%+ Match</option>
          <option value={85}>85%+ Match</option>
          <option value={90}>90%+ Match (Top)</option>
        </select>
      </div>
    </div>
  );
};
