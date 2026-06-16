import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import classnames from 'classnames';
import type { PhotoAngle } from '@/types';
import styles from './index.module.scss';

interface PhotoGuideProps {
  angles: PhotoAngle[];
  photos: Record<string, string>;
  onTakePhoto: (id: string) => void;
}

const PhotoGuide: React.FC<PhotoGuideProps> = ({ angles, photos, onTakePhoto }) => {
  return (
    <View className={styles.grid}>
      {angles.map((angle) => {
        const hasPhoto = !!photos[angle.id];
        return (
          <View
            key={angle.id}
            className={classnames(styles.angleCard, hasPhoto && styles.angleSelected)}
            onClick={() => onTakePhoto(angle.id)}
          >
            {hasPhoto ? (
              <Image
                className={styles.photoPreview}
                src={photos[angle.id]}
                mode="aspectFill"
              />
            ) : (
              <View className={styles.iconWrap}>
                <Text className={styles.cameraIcon}>📷</Text>
              </View>
            )}
            <Text className={classnames(styles.angleName, hasPhoto && styles.angleNameSelected)}>
              {angle.name}
            </Text>
            <Text className={styles.angleInstruction}>{angle.instruction}</Text>
            {hasPhoto && <View className={styles.doneBadge}>已拍</View>}
          </View>
        );
      })}
    </View>
  );
};

export default PhotoGuide;
