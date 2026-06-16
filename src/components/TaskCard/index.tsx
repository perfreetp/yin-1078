import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import type { TaskItem } from '@/types';
import styles from './index.module.scss';

interface TaskCardProps {
  task: TaskItem;
  onToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  return (
    <View className={classnames(styles.card, task.completed && styles.completed)}>
      <View className={styles.checkArea} onClick={() => onToggle(task.id)}>
        <View className={classnames(styles.checkbox, task.completed && styles.checkboxDone)}>
          {task.completed && <Text className={styles.checkMark}>✓</Text>}
        </View>
      </View>
      <View className={styles.content}>
        <View className={styles.header}>
          <Text className={styles.emoji}>{task.emoji}</Text>
          <Text className={classnames(styles.title, task.completed && styles.titleDone)}>
            {task.title}
          </Text>
        </View>
        <Text className={styles.time}>{task.time}</Text>
        <Text className={styles.description}>{task.description}</Text>
      </View>
    </View>
  );
};

export default TaskCard;
