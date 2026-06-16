import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import PhotoGuide from '@/components/PhotoGuide';
import { mockPhotoAngles } from '@/data/photos';
import { useAppStore } from '@/store/useAppStore';
import type { PhotoResult } from '@/types';
import styles from './index.module.scss';

const resultConfig: Record<PhotoResult, { label: string; style: string }> = {
  pending: { label: '待医生查看', style: styles.resultPending },
  normal: { label: '正常', style: styles.resultNormal },
  observe: { label: '继续观察', style: styles.resultObserve },
  visit: { label: '建议到院', style: styles.resultVisit },
};

const PhotoPage: React.FC = () => {
  const { photoSubmissions, addPhotoSubmission, updatePhotoResult } = useAppStore();
  const [photos, setPhotos] = useState<Record<string, string>>({});

  const photoCount = Object.keys(photos).length;
  const canSubmit = photoCount === 5;

  const handleTakePhoto = (angleId: string) => {
    const angleInfo = mockPhotoAngles.find((a) => a.id === angleId);
    Taro.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: (res) => {
        const sourceType = res.tapIndex === 0 ? ['camera'] : ['album'];
        Taro.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sourceType: sourceType as any,
          sizeType: ['compressed'],
          success: (mediaRes) => {
            if (mediaRes.tempFiles && mediaRes.tempFiles.length > 0) {
              const tempFilePath = mediaRes.tempFiles[0].tempFilePath;
              setPhotos((prev) => ({ ...prev, [angleId]: tempFilePath }));
              console.info('[Photo] Photo taken for angle:', angleId, tempFilePath);
            }
          },
          fail: (err) => {
            console.error('[Photo] chooseMedia failed:', err);
            Taro.showToast({ title: '取消选择', icon: 'none' });
          },
        });
      },
      fail: () => {},
    });
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      Taro.showToast({ title: `还需拍摄 ${5 - photoCount} 个角度`, icon: 'none' });
      return;
    }
    Taro.showModal({
      title: '确认提交',
      content: `已拍摄5个角度，确认提交给医生查看？医生一般会在24小时内反馈。`,
      success: (res) => {
        if (res.confirm) {
          addPhotoSubmission({
            angles: Object.keys(photos),
            photos,
          });
          setPhotos({});
          Taro.showToast({ title: '提交成功，等待医生查看', icon: 'success' });
        }
      },
    });
  };

  const handleAddFeedback = (id: string) => {
    Taro.showActionSheet({
      itemList: ['正常', '继续观察', '建议到院'],
      success: (res) => {
        const results: PhotoResult[] = ['normal', 'observe', 'visit'];
        const selectedResult = results[res.tapIndex];
        const resultLabels = ['正常', '继续观察', '建议到院'];
        Taro.showModal({
          title: `录入医生反馈（${resultLabels[res.tapIndex]}）`,
          editable: true,
          placeholderText: '请输入医生反馈意见...',
          success: (modalRes) => {
            if (modalRes.confirm) {
              updatePhotoResult(
                id,
                selectedResult,
                modalRes.content || '医生已查看，暂无特别意见'
              );
              Taro.showToast({ title: '反馈已更新', icon: 'success' });
            }
          },
        });
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
            {photoCount}/5
          </Text>
        </View>
        <PhotoGuide
          angles={mockPhotoAngles}
          photos={photos}
          onTakePhoto={handleTakePhoto}
        />
      </View>

      <View className={styles.tipCard}>
        <Text className={styles.tipText}>
          💡 拍照小贴士：选择光线充足的地方，嘴巴自然张开，尽量对准牙齿中心拍摄，避免模糊
        </Text>
      </View>

      <View
        className={classnames(styles.submitBtn, !canSubmit && styles.submitBtnDisabled)}
        onClick={handleSubmit}
      >
        <Text className={styles.submitBtnText}>
          {canSubmit ? '提交照片给医生' : `还需拍摄 ${5 - photoCount} 个角度`}
        </Text>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>📝</Text>复查记录
          </Text>
        </View>
        {photoSubmissions.map((sub) => {
          const config = resultConfig[sub.result];
          return (
            <View className={styles.resultCard} key={sub.id}>
              <View className={styles.resultHeader}>
                <Text className={styles.resultDate}>{sub.submittedAt}</Text>
                <Text className={classnames(styles.resultTag, config.style)}>
                  {config.label}
                </Text>
              </View>
              {sub.result === 'pending' ? (
                <>
                  <Text className={styles.resultLabel}>等待医生查看</Text>
                  <Text className={styles.resultNote}>
                    您的照片已提交，医生通常会在24小时内给出反馈。
                  </Text>
                  <View
                    className={styles.feedbackBtn}
                    onClick={() => handleAddFeedback(sub.id)}
                  >
                    <Text className={styles.feedbackBtnText}>模拟医生反馈</Text>
                  </View>
                </>
              ) : (
                <>
                  <Text className={styles.resultLabel}>医生反馈</Text>
                  <Text className={styles.resultNote}>{sub.doctorNote}</Text>
                  {sub.doctorRepliedAt && (
                    <Text className={styles.resultReplyTime}>
                      反馈时间：{sub.doctorRepliedAt}
                    </Text>
                  )}
                </>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PhotoPage;
