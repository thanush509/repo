import type { ApplicationQuestion } from '../../types';
import { AlertCircle, Check, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

interface QuestionCardProps {
  question: ApplicationQuestion;
  index: number;
  total: number;
  onAnswerChange: (answer: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  onAnswerChange,
}) => {
  const [customValue, setCustomValue] = useState(question.userAnswer || '');
  const isNeedsInput = question.confidence === 'Low' || !question.userAnswer;

  const handleSelect = (val: string) => {
    setCustomValue(val);
    onAnswerChange(val);
  };

  return (
    <div className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
      {/* Question Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <span className="text-xs font-semibold text-zinc-400 font-mono">
          Question {index + 1} of {total}
        </span>

        {/* AI Confidence & Source Pill */}
        <div className="flex items-center gap-2">
          {question.confidence === 'High' && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200/70 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-zinc-600" />
              <span>Auto-filled · High confidence</span>
            </span>
          )}

          {isNeedsInput && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <span>Needs your input</span>
            </span>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 tracking-tight leading-snug">
          {question.question}
        </h3>
        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-zinc-400" />
          <span>Source: {question.source}</span>
        </div>
      </div>

      {/* Answer Options or Text Input */}
      <div className="space-y-2 pt-1">
        {question.options && question.options.length > 0 ? (
          <div className="space-y-2">
            {question.options.map((opt) => {
              const isSelected = question.userAnswer === opt;
              const isAISuggested = question.aiSuggestedAnswer === opt && question.confidence !== 'Low';

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border text-left text-xs sm:text-sm transition-all cursor-pointer',
                    isSelected
                      ? 'border-zinc-900 bg-zinc-50/80 font-medium text-zinc-900 shadow-2xs'
                      : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/40 text-zinc-700'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full border flex items-center justify-center transition-colors',
                        isSelected
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-300 bg-white'
                      )}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span>{opt}</span>
                  </div>

                  {isAISuggested && (
                    <span className="text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded font-mono">
                      AI Suggested
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <textarea
              rows={3}
              value={customValue}
              onChange={(e) => {
                setCustomValue(e.target.value);
                onAnswerChange(e.target.value);
              }}
              placeholder="Type your response..."
              className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>
        )}
      </div>
    </div>
  );
};
