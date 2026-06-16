import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import PhotoGuide from '@/components/PhotoGuide';
import { mockPhotoAngles, mockPhotoSubmissions } from '@/data/photos';
import styles from './index.module.scss';

const resultConfig = {
  normal: { label: '正常', style: styles.resultNormal },
  observe: { label: '继续观察', style: styles.resultObserve },
  visit: { label: '建议到院', style: styles.resultVisit },
};

const PhotoPage: React.FC = () => {
  const [selectedAngles, setSelectedAngles] = useState<string[]>([]);

  const handleToggleAngle = (id: string) => {
    setSelectedAngles((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedAngles.length < 5) {
      Taro.showToast({ title: '请完成所有5个角度的拍摄', icon: 'none' });
      return;
    }
    Taro.showModal({
      title: '确认提交',
      content: `已拍摄${selectedAngles.length}个角度，确认提交给医生查看？`,
      success: (res) => {
        if (res.confirm) {
          console.info('[Photo] Submission:', selectedAngles);
          Taro.showToast({ title: '提交成功，医生将尽快查看', icon: 'success' });
          setSelectedAngles([]);
        }
      },
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>拍照复查 📸</Text>
        <Text className={styles.headerDesc}>
          按照固定角度拍摄口内照片，提交给医生远程初筛
        </Text>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>📷</Text>拍照指引
          </Text>
          <Text className={styles.photoCount}>
            {selectedAngles.length}/5
          </Text>
        </View>
        <PhotoGuide
          angles={mockPhotoAngles}
          selectedIds={selectedAngles}
          onToggle={handleToggleAngle}
        />
      </View>

      <View className={styles.tipCard}>
        <Text className={styles.tipText}>
          💡 拍照小贴士：选择光线充足的地方，嘴巴自然张开，尽量对准牙齿中心拍摄，避免模糊
        </Text>
      </View>

      <View
        className={styles.submitBtn}
        onClick={handleSubmit}
      >
        <Text className={styles.submitBtnText}>提交照片给医生</Text>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>📝</Text>复查记录
          </Text>
        </View>
        {mockPhotoSubmissions.map((sub) => {
          const config = resultConfig[sub.result];
          return (
            <View className={styles.resultCard} key={sub.id}>
              <View className={styles.resultHeader}>
                <Text className={styles.resultDate}>{sub.submittedAt}</Text>
                <Text className={classnames(styles.resultTag, config.style)}>
                  {config.label}
                </Text>
              </View>
              <Text className={styles.resultLabel}>
                医生反馈
              </Text>
              <Text className={styles.resultNote}>{sub.doctorNote}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PhotoPage;
