import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  emoji?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, color, emoji }) => {
  return (
    <View className={styles.card}>
      {emoji && <Text className={styles.emoji}>{emoji}</Text>}
      <View className={styles.valueRow}>
        <Text className={styles.value} style={color ? { color } : undefined}>
          {value}
        </Text>
        {unit && <Text className={styles.unit}>{unit}</Text>}
      </View>
      <Text className={styles.label}>{label}</Text>
    </View>
  );
};

export default StatCard;
