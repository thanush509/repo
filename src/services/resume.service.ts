import type { Resume, ResumeVersion } from '../types';
import { useResumeStore } from '../stores/useResumeStore';
import { useUIStore } from '../stores/useUIStore';

export const resumeService = {
  getResume: (): Resume => {
    return useResumeStore.getState().resume;
  },

  uploadResume: async (
    fileName: string,
    fileSize: string,
    onStatusChange?: (status: 'uploading' | 'parsing' | 'ready') => void
  ): Promise<Resume> => {
    const store = useResumeStore.getState();

    // Step 1: Uploading
    store.setUploading(true, 'uploading');
    onStatusChange?.('uploading');
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Step 2: Parsing
    store.setUploading(true, 'parsing');
    onStatusChange?.('parsing');
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Step 3: Ready
    store.replaceResumeFile(fileName, fileSize);
    store.setUploading(false, 'ready');
    onStatusChange?.('ready');

    useUIStore.getState().addNotification({
      title: 'Resume uploaded and parsed',
      description: `${fileName} parsed successfully with 9 skills and 2 certifications detected.`,
      type: 'tailor',
      link: '/resume',
    });

    return store.resume;
  },

  addVersion: (version: ResumeVersion) => {
    useResumeStore.getState().addResumeVersion(version);
  },

  selectVersion: (versionId: string | null) => {
    useResumeStore.getState().setSelectedVersionId(versionId);
  },
};
