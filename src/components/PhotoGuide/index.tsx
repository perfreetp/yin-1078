import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import type { PhotoAngle } from '@/types';
import styles from './index.module.scss';

interface PhotoGuideProps {
  angles: PhotoAngle[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const PhotoGuide: React.FC<PhotoGuideProps> = ({ angles, selectedIds, onToggle }) => {
  return (
    <View className={styles.grid}>
      {angles.map((angle) => {
        const isSelected = selectedIds.includes(angle.id);
        return (
          <View
            key={angle.id}
            className={classnames(styles.angleCard, isSelected && styles.angleSelected)}
            onClick={() => onToggle(angle.id)}
          >
            <View className={classnames(styles.iconWrap, isSelected && styles.iconWrapSelected)}>
              <Text className={styles.angleEmoji}>{angle.emoji}</Text>
            </View>
            <Text className={classnames(styles.angleName, isSelected && styles.angleNameSelected)}>
              {angle.name}
            </Text>
            <Text className={styles.angleInstruction}>{angle.instruction}</Text>
            {isSelected && <View className={styles.doneBadge}>已拍</View>}
          </View>
        );
      })}
    </View>
  );
};

export default PhotoGuide;
