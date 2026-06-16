import type { FamilyNote, ComplianceWeek } from '@/types';

export const mockFamilyNotes: FamilyNote[] = [
  {
    id: 'fn1',
    taskId: 't3',
    content: '今天中午在学校吃的，用漱口水代替了刷牙',
    createdAt: '2026-06-16 12:45',
    author: 'parent',
  },
  {
    id: 'fn2',
    taskId: 't4',
    content: '皮筋今天换了两次，比昨天有进步',
    createdAt: '2026-06-16 20:00',
    author: 'parent',
  },
  {
    id: 'fn3',
    taskId: 't5',
    content: '晚间清洁比较认真，用了牙线和冲牙器',
    createdAt: '2026-06-15 21:30',
    author: 'parent',
  },
  {
    id: 'fn4',
    taskId: 't1',
    content: '下午摘了半小时忘了戴，已补戴',
    createdAt: '2026-06-15 16:20',
    author: 'child',
  },
];

export const mockComplianceWeeks: ComplianceWeek[] = [
  {
    label: '本周',
    score: 85,
    days: [100, 80, 90, 70, 85, 95, 75],
  },
  {
    label: '上周',
    score: 78,
    days: [70, 90, 80, 60, 85, 90, 70],
  },
  {
    label: '两周前',
    score: 72,
    days: [60, 75, 85, 70, 65, 80, 70],
  },
  {
    label: '三周前',
    score: 68,
    days: [50, 70, 80, 65, 60, 75, 65],
  },
];

export const weekDayLabels = ['一', '二', '三', '四', '五', '六', '日'];
