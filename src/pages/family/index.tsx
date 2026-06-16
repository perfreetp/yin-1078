import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { mockTasks, mockEmergencies } from '@/data/tasks';
import { mockFamilyNotes, mockComplianceWeeks, weekDayLabels } from '@/data/family';
import styles from './index.module.scss';

const FamilyPage: React.FC = () => {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const currentWeek = mockComplianceWeeks[0];
  const completedCount = mockTasks.filter((t) => t.completed).length;

  const handleCheckIn = (taskId: string, taskTitle: string) => {
    if (checkedTasks[taskId]) return;
    Taro.showModal({
      title: '代打卡确认',
      content: `确认为孩子完成「${taskTitle}」？`,
      success: (res) => {
        if (res.confirm) {
          setCheckedTasks((prev) => ({ ...prev, [taskId]: true }));
          console.info('[Family] Check-in for task:', taskId);
          Taro.showToast({ title: '已代为打卡 ✓', icon: 'none' });
        }
      },
    });
  };

  const handleAddNote = () => {
    Taro.showModal({
      title: '添加备注',
      editable: true,
      placeholderText: '记录孩子的表现...',
      success: (res) => {
        if (res.confirm && res.content) {
          console.info('[Family] Note added:', res.content);
          Taro.showToast({ title: '备注已添加', icon: 'none' });
        }
      },
    });
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return '#34D399';
    if (score >= 60) return '#FBBF24';
    return '#F87171';
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>家庭监督 🏠</Text>
        <Text className={styles.headerDesc}>帮孩子打卡、记备注，一起守护笑容</Text>
      </View>

      <View className={styles.scoreCard}>
        <View className={styles.scoreItem}>
          <Text className={styles.scoreValue}>{currentWeek.score}</Text>
          <Text className={styles.scoreLabel}>本周依从性</Text>
        </View>
        <View className={styles.scoreDivider} />
        <View className={styles.scoreItem}>
          <Text className={styles.scoreValue}>{completedCount}/{mockTasks.length}</Text>
          <Text className={styles.scoreLabel}>今日完成</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>✅</Text>代打卡
          </Text>
        </View>
        {mockTasks.map((task) => {
          const isChecked = checkedTasks[task.id] || task.completed;
          return (
            <View className={styles.taskCard} key={task.id}>
              <View className={styles.taskTop}>
                <View className={styles.taskLeft}>
                  <Text className={styles.taskEmoji}>{task.emoji}</Text>
                  <Text className={styles.taskTitle}>{task.title}</Text>
                </View>
                <Text
                  className={classnames(
                    styles.taskStatus,
                    isChecked ? styles.taskDone : styles.taskPending
                  )}
                >
                  {isChecked ? '已完成' : '待完成'}
                </Text>
              </View>
              <View
                className={classnames(
                  styles.checkInBtn,
                  isChecked && styles.checkInBtnDone
                )}
                onClick={() => !isChecked && handleCheckIn(task.id, task.title)}
              >
                <Text
                  className={classnames(
                    styles.checkInBtnText,
                    isChecked && styles.checkInBtnDoneText
                  )}
                >
                  {isChecked ? '已打卡' : '代为打卡'}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>📝</Text>家长备注
          </Text>
        </View>
        <View className={styles.noteArea}>
          {mockFamilyNotes.map((note) => (
            <View className={styles.noteItem} key={note.id}>
              <Text className={styles.noteAuthor}>
                {note.author === 'parent' ? '家长' : '孩子'}
              </Text>
              <Text className={styles.noteContent}>{note.content}</Text>
              <Text className={styles.noteTime}>
                {note.createdAt.split(' ')[1]}
              </Text>
            </View>
          ))}
        </View>
        <View className={styles.addNoteBtn} onClick={handleAddNote}>
          <Text className={styles.addNoteBtnText}>+ 添加新备注</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>📊</Text>本周依从性
          </Text>
        </View>
        <View className={styles.weekChart}>
          <View className={styles.weekRow}>
            {currentWeek.days.map((score, idx) => (
              <View className={styles.weekBarItem} key={idx}>
                <View
                  className={styles.weekBar}
                  style={{
                    height: `${(score / 100) * 160}rpx`,
                    background: getBarColor(score),
                  }}
                />
                <Text className={styles.weekBarLabel}>{weekDayLabels[idx]}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>🚨</Text>突发情况记录
          </Text>
        </View>
        <View className={styles.emergencyLog}>
          {mockEmergencies.map((e) => (
            <View className={styles.emergencyItem} key={e.id}>
              <View
                className={classnames(
                  styles.emergencyDot,
                  e.status === 'pending' ? styles.emergencyDotPending : styles.emergencyDotHandled
                )}
              />
              <View className={styles.emergencyContent}>
                <Text className={styles.emergencyType}>
                  {e.type === 'bracket' ? '托槽脱落' : '钢丝扎嘴'}
                </Text>
                <Text className={styles.emergencyDesc}>
                  {e.description} · {e.reportedAt}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FamilyPage;
