import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ExperienceItem({
  company,
  summary,
  topics,
  isCurrent,
}: {
  company: string;
  summary: string;
  topics: string[];
  isCurrent: boolean;
}) {
  return (
    <li className="relative pb-[18px] pl-8">
      <span
        aria-hidden="true"
        className={cn(
          'border-cream absolute -left-2 top-6 size-3.5 rounded-full border-[3px]',
          isCurrent ? 'bg-clay' : 'bg-dusty',
        )}
      />
      <details className="border-line bg-paper group rounded-[18px] border">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="text-espresso block text-lg font-semibold">
              {company}
            </span>
            <span className="text-taupe block text-[15px]">{summary}</span>
          </span>
          <ChevronDown
            size={20}
            strokeWidth={1.6}
            aria-hidden="true"
            className="text-clay-deep shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          />
        </summary>
        <ul className="text-mocha list-disc pb-[18px] pl-10 pr-5 text-[15px]">
          {topics.map((topic) => (
            <li key={topic} className="mt-1.5">
              {topic}
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
