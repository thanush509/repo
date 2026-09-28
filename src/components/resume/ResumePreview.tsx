import type { Profile, Resume } from '../../types';
import { Mail, MapPin, Phone } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
  profile: Profile;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  profile,
}) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6 text-zinc-800 font-sans">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-5 text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 uppercase">
          {profile.firstName} {profile.lastName}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-500 font-mono">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-zinc-400" />
            {profile.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3 text-zinc-400" />
            {profile.email}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-zinc-400" />
            {profile.phone}
          </span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-1">
          Professional Summary
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          {resume.summary || profile.summary}
        </p>
      </div>

      {/* Core Competencies / Skills */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-1">
          Core Competencies & Skills
        </h3>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-0.5 bg-zinc-50 border border-zinc-200 rounded text-zinc-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-1">
          Professional Experience
        </h3>
        {profile.experiences.map((exp) => (
          <div key={exp.id} className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
              <div>
                <span className="font-bold text-zinc-900">{exp.role}</span>
                <span className="text-zinc-400 mx-1.5">|</span>
                <span className="font-medium text-zinc-700">{exp.company}</span>
              </div>
              <span className="text-zinc-500 font-mono text-[11px]">
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {exp.description}
            </p>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-xs text-zinc-600 pt-1 pl-1">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Certifications & Education */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-100">
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-1">
            Certifications
          </h3>
          <ul className="space-y-1 text-xs text-zinc-600">
            {profile.certifications.map((cert, idx) => (
              <li key={idx}>• {cert}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-1">
            Education
          </h3>
          {profile.educations.map((edu) => (
            <div key={edu.id} className="text-xs text-zinc-600">
              <div className="font-semibold text-zinc-800">
                {edu.degree} in {edu.field}
              </div>
              <div className="text-zinc-500 font-mono text-[11px]">
                {edu.institution} ({edu.startYear} – {edu.endYear})
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
