import React, { useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import TaskCard from '@/components/TaskCard';
import { mockTasks, mockReminders, mockModes } from '@/data/tasks';
import styles from './index.module.scss';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [currentMode, setCurrentMode] = useState<'normal' | 'exam' | 'boarding'>('normal');

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const totalCount = tasks.length;

  const handleToggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleEmergency = (type: string, title: string) => {
    Taro.showModal({
      title: `${title}`,
      content: `请描述${title}的具体情况`,
      editable: true,
      placeholderText: '例如：左上2号牙...',
      success: (res) => {
        if (res.confirm && res.content) {
          console.info('[Tasks] Emergency reported:', type, res.content);
          Taro.showToast({ title: '已记录，医生会尽快查看', icon: 'none' });
        }
      },
    });
  };

  const handleModeChange = (type: 'normal' | 'exam' | 'boarding') => {
    setCurrentMode(type);
    const modeInfo = mockModes.find((m) => m.type === type);
    Taro.showToast({ title: `已切换为${modeInfo?.label}`, icon: 'none' });
  };

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const dayStr = `星期${weekDays[today.getDay()]}`;

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.greeting}>早上好，小齿 🌟</Text>
        <View className={styles.dateRow}>
          <Text className={styles.dateText}>
            {dateStr} {dayStr}
          </Text>
          <View className={styles.modeTag}>
            <Text className={styles.modeEmoji}>{mockModes.find((m) => m.type === currentMode)?.emoji}</Text>
            <Text className={styles.modeLabel}>{mockModes.find((m) => m.type === currentMode)?.label}</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>📋</Text>今日任务
          </Text>
          <Text className={styles.progressText}>
            {completedCount}/{totalCount}
          </Text>
        </View>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>🚨</Text>突发情况快报
          </Text>
        </View>
        <View className={styles.emergencyGrid}>
          <View className={styles.emergencyCard} onClick={() => handleEmergency('bracket', '托槽脱落')}>
            <Text className={styles.emergencyEmoji}>💔</Text>
            <Text className={styles.emergencyTitle}>托槽脱落</Text>
            <Text className={styles.emergencyDesc}>发现托槽松动或掉落</Text>
          </View>
          <View className={styles.emergencyCard} onClick={() => handleEmergency('wire', '钢丝扎嘴')}>
            <Text className={styles.emergencyEmoji}>⚠️</Text>
            <Text className={styles.emergencyTitle}>钢丝扎嘴</Text>
            <Text className={styles.emergencyDesc}>钢丝末端刺到口腔</Text>
          </View>
        </View>
      </View>

      <View className={styles.modeSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>⚙️</Text>模式切换
          </Text>
        </View>
        <View className={styles.modeGrid}>
          {mockModes.map((mode) => (
            <View
              key={mode.type}
              className={classnames(styles.modeCard, currentMode === mode.type && styles.modeCardActive)}
              onClick={() => handleModeChange(mode.type as 'normal' | 'exam' | 'boarding')}
            >
              <Text className={styles.modeCardEmoji}>{mode.emoji}</Text>
              <Text
                className={classnames(
                  styles.modeCardLabel,
                  currentMode === mode.type && styles.modeCardLabelActive
                )}
              >
                {mode.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>⏰</Text>今日提醒
          </Text>
        </View>
        <View className={styles.reminderList}>
          {mockReminders.map((r) => (
            <View className={styles.reminderItem} key={r.id}>
              <Text className={styles.reminderEmoji}>{r.emoji}</Text>
              <Text className={styles.reminderTime}>{r.time}</Text>
              <Text className={styles.reminderLabel}>{r.label}</Text>
              <View className={classnames(styles.reminderDot, !r.enabled && styles.reminderDotOff)} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TasksPage;
