import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import { mockComplianceWeeks, weekDayLabels } from '@/data/family';
import styles from './index.module.scss';

const FamilyPage: React.FC = () => {
  const {
    tasks,
    familyNotes,
    emergencies,
    toggleTask,
    addFamilyNote,
  } = useAppStore();

  useDidShow(() => {
    console.info('[Family] Page shown, notes count:', familyNotes.length);
  });

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const complianceScore = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedCount / tasks.length) * 100);
  }, [tasks, completedCount]);
  const currentWeek = mockComplianceWeeks[0];

  const handleCheckIn = (taskId: string, taskTitle: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task?.completed) return;
    Taro.showModal({
      title: '代打卡确认',
      content: `确认为孩子完成「${taskTitle}」？`,
      success: (res) => {
        if (res.confirm) {
          toggleTask(taskId);
          addFamilyNote(`家长代打卡：${taskTitle}`, 'parent', taskId);
          Taro.showToast({ title: '已代为打卡 ✓', icon: 'success' });
        }
      },
    });
  };

  const handleAddNote = () => {
    Taro.showModal({
      title: '添加备注',
      editable: true,
      placeholderText: '记录孩子的表现、问题或观察...',
      success: (res) => {
        if (res.confirm && res.content) {
          addFamilyNote(res.content, 'parent');
          Taro.showToast({ title: '备注已添加', icon: 'success' });
        }
      },
    });
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return '#34D399';
    if (score >= 60) return '#FBBF24';
    return '#F87171';
  };

  const emergencyTypeLabels: Record<string, string> = {
    bracket: '托槽脱落',
    wire: '钢丝扎嘴',
    other: '其他问题',
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>家庭监督 🏠</Text>
        <Text className={styles.headerDesc}>帮孩子打卡、记备注，一起守护笑容</Text>
      </View>

      <View className={styles.scoreCard}>
        <View className={styles.scoreItem}>
          <Text className={styles.scoreValue}>{complianceScore}</Text>
          <Text className={styles.scoreLabel}>今日依从性</Text>
        </View>
        <View className={styles.scoreDivider} />
        <View className={styles.scoreItem}>
          <Text className={styles.scoreValue}>{completedCount}/{tasks.length}</Text>
          <Text className={styles.scoreLabel}>今日完成</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>✅</Text>代打卡
          </Text>
        </View>
        {tasks.map((task) => {
          const isChecked = task.completed;
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
          {familyNotes.length === 0 ? (
            <View className={styles.emptyNotes}>
              <Text className={styles.emptyText}>暂无备注，点击下方按钮添加</Text>
            </View>
          ) : (
            familyNotes.map((note) => (
              <View className={styles.noteItem} key={note.id}>
                <Text
                  className={classnames(
                    styles.noteAuthor,
                    note.author === 'parent' ? styles.noteAuthorParent : styles.noteAuthorChild
                  )}
                >
                  {note.author === 'parent' ? '家长' : '孩子'}
                </Text>
                <View className={styles.noteBody}>
                  <Text className={styles.noteContent}>{note.content}</Text>
                  <Text className={styles.noteTime}>{note.createdAt}</Text>
                </View>
              </View>
            ))
          )}
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
          {emergencies.length === 0 ? (
            <View className={styles.emptyEmergency}>
              <Text className={styles.emptyText}>暂无突发情况记录</Text>
            </View>
          ) : (
            emergencies.map((e) => (
              <View className={styles.emergencyItem} key={e.id}>
                <View
                  className={classnames(
                    styles.emergencyDot,
                    e.status === 'pending' ? styles.emergencyDotPending : styles.emergencyDotHandled
                  )}
                />
                <View className={styles.emergencyContent}>
                  <Text className={styles.emergencyType}>
                    {emergencyTypeLabels[e.type] || '其他'}
                    <Text className={styles.emergencyStatus}>
                      {e.status === 'pending' ? '（待处理）' : '（已处理）'}
                    </Text>
                  </Text>
                  <Text className={styles.emergencyDesc}>
                    {e.description}
                  </Text>
                  <Text className={styles.emergencyTime}>{e.reportedAt}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default FamilyPage;
