import React, { useState } from 'react';
import { useResumeStore } from '../stores/useResumeStore';
import { useProfileStore } from '../stores/useProfileStore';
import { ResumeUpload } from '../components/resume/ResumeUpload';
import { ResumePreview } from '../components/resume/ResumePreview';
import { ResumeVersionList } from '../components/resume/ResumeVersionList';
import { ResumeComparison } from '../components/resume/ResumeComparison';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { FileText, Sparkles, Upload } from 'lucide-react';
import { formatRelativeTime } from '../utils/formatters';
import type { ResumeVersion } from '../types';
import { useNavigate } from 'react-router-dom';

export const ResumePage: React.FC = () => {
  const resume = useResumeStore((state) => state.resume);
  const profile = useProfileStore((state) => state.profile);
  const navigate = useNavigate();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedVersionForModal, setSelectedVersionForModal] = useState<ResumeVersion | null>(null);

  const handleSelectVersion = (version: ResumeVersion) => {
    setSelectedVersionForModal(version);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Resume & Tailored Versions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Manage your master baseline resume and inspect role-specific optimized variations.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/discover')}
          leftIcon={<Sparkles className="w-3.5 h-3.5" />}
        >
          Create Tailored Version
        </Button>
      </div>

      {/* Current Master Resume Box */}
      <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 shrink-0 mt-0.5">
            <FileText className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-900">
                {resume.fileName}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                Master Baseline
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
              <span>{resume.fileSize}</span>
              <span>·</span>
              <span>Uploaded {formatRelativeTime(resume.uploadedAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreviewModal(true)}
          >
            View Document
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowUploadModal(true)}
            leftIcon={<Upload className="w-3.5 h-3.5" />}
          >
            Replace Resume
          </Button>
        </div>
      </div>

      {/* Generated Tailored Versions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 tracking-tight">
              Generated Versions
            </h2>
            <p className="text-xs text-zinc-500">
              Role-specific resumes tailored by JobPilot with aligned keywords and quantified metrics.
            </p>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            {resume.versions.length} versions
          </span>
        </div>

        <ResumeVersionList
          versions={resume.versions}
          onSelectVersion={handleSelectVersion}
        />
      </div>

      {/* Upload/Replace Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload & Parse Resume"
        subtitle="JobPilot will automatically detect your medical coding experience, skills, and certifications."
        maxWidth="lg"
      >
        <ResumeUpload
          onUploadComplete={() => {
            setTimeout(() => setShowUploadModal(false), 800);
          }}
        />
      </Modal>

      {/* View Master Document Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Master Resume Preview"
        subtitle="Structured representation parsed from your upload"
        maxWidth="3xl"
      >
        <ResumePreview resume={resume} profile={profile} />
      </Modal>

      {/* Tailored Version Diff Comparison Modal */}
      <Modal
        isOpen={!!selectedVersionForModal}
        onClose={() => setSelectedVersionForModal(null)}
        title={selectedVersionForModal ? `${selectedVersionForModal.jobTitle} — ${selectedVersionForModal.company}` : undefined}
        subtitle="Detailed side-by-side diff comparison against your baseline resume"
        maxWidth="4xl"
      >
        {selectedVersionForModal && (
          <ResumeComparison
            tailoredVersion={selectedVersionForModal}
            onUseVersion={() => {
              setSelectedVersionForModal(null);
              navigate('/discover');
            }}
            onRegenerate={() => {}}
          />
        )}
      </Modal>
    </div>
  );
};
