import React, { useRef, useState } from 'react';
import { CheckCircle2, FileText, Loader2, UploadCloud } from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

interface ResumeUploadProps {
  onUploadComplete?: (fileName: string, fileSize: string) => void;
  className?: string;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  onUploadComplete,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'ready'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUploadAndParse = async (name: string, size = '142 KB') => {
    setFileName(name);
    setStatus('uploading');

    // Step 1: Uploading
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus('parsing');

    // Step 2: Parsing
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('ready');

    onUploadComplete?.(name, size);
  };

  const handleFile = (file: File) => {
    if (file) {
      const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      simulateUploadAndParse(file.name, sizeStr);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => status !== 'uploading' && status !== 'parsing' && fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 sm:p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center',
          dragActive
            ? 'border-zinc-900 bg-zinc-50'
            : 'border-zinc-200 hover:border-zinc-400 bg-white hover:bg-zinc-50/50',
          status === 'uploading' || status === 'parsing' ? 'cursor-wait opacity-80' : ''
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {status === 'idle' && (
          <>
            <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-1">
              Click to upload or drag & drop
            </h4>
            <p className="text-xs text-zinc-500 mb-4">
              Supported formats: PDF, DOCX (Max 10MB)
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Select File
            </Button>
          </>
        )}

        {(status === 'uploading' || status === 'parsing') && (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mx-auto" />
            <div>
              <div className="text-sm font-semibold text-zinc-900">
                {status === 'uploading' ? 'Uploading resume...' : 'Extracting & parsing sections...'}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5 font-mono">
                {fileName}
              </div>
            </div>
          </div>
        )}

        {status === 'ready' && (
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold text-zinc-900">
              {fileName || 'Keerthick_Resume.pdf'}
            </div>
            <p className="text-xs text-emerald-700 font-medium">
              Parsed successfully
            </p>
          </div>
        )}
      </div>

      {/* Parsed Sections Confirmation */}
      {status === 'ready' && (
        <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-600" />
              <span className="text-xs font-semibold text-zinc-900">
                Sections Detected
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">100% confidence</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { title: 'Experience', desc: '1 Role (MediCare RCM)' },
              { title: 'Skills', desc: '10 Coded Terms' },
              { title: 'Education', desc: 'B.Sc. Biotechnology' },
              { title: 'Certifications', desc: 'CPC · AAPC Credential' },
            ].map((sec) => (
              <div
                key={sec.title}
                className="bg-white border border-zinc-200/60 rounded-lg p-2.5 text-left"
              >
                <div className="text-xs font-medium text-zinc-900 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{sec.title}</span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                  {sec.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
