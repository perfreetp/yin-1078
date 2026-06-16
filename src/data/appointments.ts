import type { AppointmentItem, CalendarEvent, DoctorInstruction } from '@/types';

export const mockAppointments: AppointmentItem[] = [
  {
    id: 'ap1',
    date: '2026-06-28',
    time: '14:30',
    doctor: '王医生',
    hospital: '阳光口腔门诊',
    note: '常规复诊，检查牙套进度，可能更换下一阶段矫治器',
    type: 'checkup',
  },
  {
    id: 'ap2',
    date: '2026-07-26',
    time: '10:00',
    doctor: '王医生',
    hospital: '阳光口腔门诊',
    note: '阶段评估，预计进入第二阶段',
    type: 'phase_change',
  },
  {
    id: 'ap3',
    date: '2026-08-23',
    time: '15:00',
    doctor: '王医生',
    hospital: '阳光口腔门诊',
    note: '调整力度，更换钢丝',
    type: 'adjust',
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { date: '2026-06-28', type: 'appointment', label: '常规复诊' },
  { date: '2026-07-26', type: 'phase_change', label: '阶段评估' },
  { date: '2026-08-23', type: 'appointment', label: '调整复诊' },
  { date: '2026-06-15', type: 'emergency', label: '托槽脱落' },
];

export const mockDoctorInstructions: DoctorInstruction[] = [
  {
    id: 'di1',
    content: '每天佩戴牙套不少于22小时',
    checked: false,
    date: '2026-06-14',
  },
  {
    id: 'di2',
    content: '咬胶每次戴入后使用5分钟',
    checked: true,
    date: '2026-06-14',
  },
  {
    id: 'di3',
    content: '橡皮筋按II类牵引方式佩戴',
    checked: false,
    date: '2026-06-14',
  },
  {
    id: 'di4',
    content: '避免啃咬硬物（苹果、排骨等）',
    checked: true,
    date: '2026-05-28',
  },
  {
    id: 'di5',
    content: '托槽脱落48小时内联系诊所',
    checked: false,
    date: '2026-05-28',
  },
  {
    id: 'di6',
    content: '每周拍照复查一次',
    checked: true,
    date: '2026-05-28',
  },
];
