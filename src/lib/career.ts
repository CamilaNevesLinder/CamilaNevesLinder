import { BookOpen, GraduationCap } from 'lucide-react';

export type ExperienceKey = 'onilearning' | 'ritmar' | 'praca22' | 'minceJoias';
export type ExperienceTopicKey = 'topic1' | 'topic2' | 'topic3' | 'topic4';
export type EducationKey = 'ads' | 'alura';

export const EXPERIENCE_ITEMS: {
  key: ExperienceKey;
  isCurrent: boolean;
  topicKeys: ExperienceTopicKey[];
}[] = [
  {
    key: 'onilearning',
    isCurrent: true,
    topicKeys: ['topic1', 'topic2', 'topic3', 'topic4'],
  },
  {
    key: 'ritmar',
    isCurrent: false,
    topicKeys: ['topic1', 'topic2', 'topic3'],
  },
  { key: 'praca22', isCurrent: false, topicKeys: ['topic1', 'topic2'] },
  { key: 'minceJoias', isCurrent: false, topicKeys: ['topic1', 'topic2'] },
];

export const EDUCATION_ITEMS: {
  key: EducationKey;
  Icon: typeof GraduationCap;
}[] = [
  { key: 'ads', Icon: GraduationCap },
  { key: 'alura', Icon: BookOpen },
];
