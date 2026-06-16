import type { PhotoAngle, PhotoSubmission } from '@/types';

export const mockPhotoAngles: PhotoAngle[] = [
  {
    id: 'a1',
    name: '正面照',
    emoji: '😁',
    instruction: '嘴唇自然张开，露出上下牙齿正面',
    placeholder: '正面微笑照',
  },
  {
    id: 'a2',
    name: '左侧照',
    emoji: '👈',
    instruction: '头部微右转，拍摄左侧牙齿侧面',
    placeholder: '左侧侧面照',
  },
  {
    id: 'a3',
    name: '右侧照',
    emoji: '👉',
    instruction: '头部微左转，拍摄右侧牙齿侧面',
    placeholder: '右侧侧面照',
  },
  {
    id: 'a4',
    name: '上颌照',
    emoji: '⬆️',
    instruction: '仰头张嘴，拍摄上排牙齿咬合面',
    placeholder: '上颌咬合照',
  },
  {
    id: 'a5',
    name: '下颌照',
    emoji: '⬇️',
    instruction: '低头张嘴，拍摄下排牙齿咬合面',
    placeholder: '下颌咬合照',
  },
];

export const mockPhotoSubmissions: PhotoSubmission[] = [
  {
    id: 'ps1',
    submittedAt: '2026-06-14 10:30',
    angles: ['a1', 'a2', 'a3', 'a4', 'a5'],
    result: 'normal',
    doctorNote: '佩戴情况良好，继续保持！下次复诊前注意咬胶训练。',
  },
  {
    id: 'ps2',
    submittedAt: '2026-06-01 09:15',
    angles: ['a1', 'a2', 'a3', 'a4', 'a5'],
    result: 'observe',
    doctorNote: '左上2号牙略有不贴合，建议增加咬胶时间，下次复诊时重点检查。',
  },
  {
    id: 'ps3',
    submittedAt: '2026-05-18 14:00',
    angles: ['a1', 'a2', 'a3', 'a4', 'a5'],
    result: 'visit',
    doctorNote: '发现托槽松动迹象，建议提前到院检查，已为您预约6月5日。',
  },
  {
    id: 'ps4',
    submittedAt: '2026-05-05 11:45',
    angles: ['a1', 'a2', 'a3', 'a4', 'a5'],
    result: 'normal',
    doctorNote: '进展顺利，牙齿排列有明显改善，请继续按要求佩戴。',
  },
];
