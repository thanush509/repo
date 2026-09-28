import React, { useState } from 'react';
import { useApplicationStore } from '../stores/useApplicationStore';
import { ApplicationRow } from '../components/applications/ApplicationRow';
import { Tabs } from '../components/common/Tabs';
import { EmptyState } from '../components/common/EmptyState';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const applications = useApplicationStore((state) => state.applications);
  const navigate = useNavigate();

  // Counts for tabs
  const allCount = applications.length;
  const readyCount = applications.filter((a) => a.status === 'READY').length;
  const appliedCount = applications.filter((a) => a.status === 'APPLIED').length;
  const interviewCount = applications.filter((a) => a.status === 'INTERVIEW').length;
  const rejectedCount = applications.filter((a) => a.status === 'REJECTED').length;
  const needsInputCount = applications.filter((a) => a.status === 'NEEDS_INPUT').length;

  const tabs = [
    { id: 'ALL', label: 'All', count: allCount },
    { id: 'READY', label: 'Ready to apply', count: readyCount },
    { id: 'APPLIED', label: 'Applied', count: appliedCount },
    { id: 'INTERVIEW', label: 'Interview', count: interviewCount },
    { id: 'NEEDS_INPUT', label: 'Needs input', count: needsInputCount },
    { id: 'REJECTED', label: 'Not selected', count: rejectedCount },
  ];

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'ALL') return true;
    return app.status === activeTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Applications
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Track and manage your automated application lifecycle across all employers.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="underline"
      />

      {/* Applications List */}
      <div className="space-y-2.5">
        {filteredApplications.length === 0 ? (
          <EmptyState
            icon={<Send className="w-5 h-5" />}
            title="No applications in this view"
            description="Once you prepare or submit applications, they will appear here."
            actionLabel="Discover Jobs"
            onAction={() => navigate('/discover')}
          />
        ) : (
          filteredApplications.map((app) => (
            <ApplicationRow key={app.id} application={app} />
          ))
        )}
      </div>
    </div>
  );
};
