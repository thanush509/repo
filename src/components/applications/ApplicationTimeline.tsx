import type { ApplicationEvent } from '../../types';
import { Check, Sparkles, Send, Calendar, Clock, AlertCircle } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface ApplicationTimelineProps {
  events: ApplicationEvent[];
  className?: string;
}

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  events,
  className,
}) => {
  const getEventIcon = (type: ApplicationEvent['type']) => {
    switch (type) {
      case 'discovered':
      case 'matched':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'tailored':
      case 'prepared':
        return <Check className="w-3.5 h-3.5" />;
      case 'submitted':
        return <Send className="w-3.5 h-3.5" />;
      case 'interview':
        return <Calendar className="w-3.5 h-3.5" />;
      case 'update':
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getEventStyle = (type: ApplicationEvent['type']) => {
    if (type === 'interview') return 'bg-purple-50 text-purple-700 border-purple-200';
    if (type === 'submitted') return 'bg-zinc-900 text-white border-zinc-900';
    return 'bg-zinc-100 text-zinc-700 border-zinc-200';
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
        {events.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline Dot */}
            <div
              className={cn(
                'absolute -left-6 top-0.5 w-5 h-5 rounded-full border flex items-center justify-center text-xs shadow-xs transition-transform group-hover:scale-110',
                getEventStyle(event.type)
              )}
            >
              {getEventIcon(event.type)}
            </div>

            {/* Event Content */}
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-xs font-semibold text-zinc-900">
                  {event.title}
                </h4>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {formatDateTime(event.timestamp)}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
