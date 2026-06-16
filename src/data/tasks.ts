import type { TaskItem, EmergencyReport, ReminderSlot, AppMode } from '@/types';

export const mockTasks: TaskItem[] = [
  {
    id: 't1',
    title: '佩戴牙套',
    emoji: '😁',
    time: '07:00 - 21:00',
    description: '全天佩戴矫治器，除进食和刷牙外不要摘下',
    completed: false,
    category: 'wear',
  },
  {
    id: 't2',
    title: '早间清洁',
    emoji: '🪥',
    time: '07:00',
    description: '刷牙2分钟，使用牙缝刷清洁托槽周围',
    completed: true,
    category: 'clean',
  },
  {
    id: 't3',
    title: '午间清洁',
    emoji: '🪥',
    time: '12:30',
    description: '午饭后刷牙，冲牙器冲洗牙套缝隙',
    completed: false,
    category: 'clean',
  },
  {
    id: 't4',
    title: '挂皮筋',
    emoji: '🔗',
    time: '全天',
    description: '按医生要求挂橡皮筋，左上到右下',
    completed: false,
    category: 'rubber',
  },
  {
    id: 't5',
    title: '晚间清洁',
    emoji: '✨',
    time: '21:00',
    description: '睡前仔细刷牙+牙线+漱口水，检查牙套贴合',
    completed: false,
    category: 'clean',
  },
  {
    id: 't6',
    title: '咬胶训练',
    emoji: '💪',
    time: '每次戴入后',
    description: '每次戴上牙套后咬咬胶5分钟，帮助贴合',
    completed: false,
    category: 'wear',
  },
];

export const mockEmergencies: EmergencyReport[] = [
  {
    id: 'e1',
    type: 'bracket',
    description: '左上2号牙托槽脱落',
    reportedAt: '2026-06-15 18:30',
    status: 'pending',
  },
  {
    id: 'e2',
    type: 'wire',
    description: '右侧钢丝末端扎嘴',
    reportedAt: '2026-06-12 20:15',
    status: 'handled',
  },
];

export const mockReminders: ReminderSlot[] = [
  { id: 'r1', time: '07:00', label: '晨起佩戴提醒', emoji: '☀️', enabled: true },
  { id: 'r2', time: '07:30', label: '早间清洁提醒', emoji: '🪥', enabled: true },
  { id: 'r3', time: '12:30', label: '午间清洁提醒', emoji: '🍱', enabled: true },
  { id: 'r4', time: '18:00', label: '晚间清洁提醒', emoji: '🌅', enabled: true },
  { id: 'r5', time: '21:00', label: '睡前佩戴提醒', emoji: '🌙', enabled: true },
];

export const mockModes: AppMode[] = [
  { type: 'normal', label: '日常模式', emoji: '😊' },
  { type: 'exam', label: '考试周模式', emoji: '📚' },
  { type: 'boarding', label: '住校模式', emoji: '🏫' },
];
