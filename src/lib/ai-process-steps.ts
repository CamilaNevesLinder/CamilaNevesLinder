import { Eye, FileText, ListChecks } from 'lucide-react';

export const AI_PROCESS_STEPS = [
  { key: 'spec', Icon: FileText },
  { key: 'plan', Icon: ListChecks },
  { key: 'review', Icon: Eye },
] as const;
