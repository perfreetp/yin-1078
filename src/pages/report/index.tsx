import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { mockFaqs, mockReportWeeks } from '@/data/reports';
import { mockDoctorInstructions } from '@/data/appointments';
import styles from './index.module.scss';

const getScoreEmoji = (score: number) => {
  if (score >= 90) return '🎉';
  if (score >= 80) return '😊';
  if (score >= 70) return '💪';
  if (score >= 60) return '🤔';
  return '🙏';
};

const getBarColor = (score: number) => {
  if (score >= 80) return '#34D399';
  if (score >= 60) return '#FBBF24';
  return '#F87171';
};

const ReportPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const currentWeek = mockReportWeeks[0];

  const handleFaqToggle = (id: string) => {
    setExpandedFaq((prev) => (prev === id ? null : id));
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>成长报告 📈</Text>
        <Text className={styles.headerDesc}>每周依从性评分与常见问题汇总</Text>
      </View>

      <View className={styles.scoreHero}>
        <Text className={styles.scoreEmoji}>{getScoreEmoji(currentWeek.score)}</Text>
        <View className={styles.scoreRow}>
          <Text className={styles.scoreNumber}>{currentWeek.score}</Text>
          <Text className={styles.scoreUnit}>分</Text>
        </View>
        <Text className={styles.scoreLabel}>本周依从性评分</Text>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>📊</Text>依从性趋势
          </Text>
        </View>
        <View className={styles.trendChart}>
          <View className={styles.trendRow}>
            {mockReportWeeks.map((week) => (
              <View className={styles.trendBarItem} key={week.label}>
                <View
                  className={styles.trendBar}
                  style={{
                    height: `${(week.score / 100) * 200}rpx`,
                    background: getBarColor(week.score),
                  }}
                >
                  <Text className={styles.trendScore}>{week.score}</Text>
                </View>
                <Text className={styles.trendLabel}>{week.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>❓</Text>常见问题
          </Text>
        </View>
        {mockFaqs.map((faq) => (
          <View className={styles.faqCard} key={faq.id} onClick={() => handleFaqToggle(faq.id)}>
            <View className={styles.faqQuestion}>
              <Text className={styles.faqIcon}>Q</Text>
              <Text className={styles.faqQ}>{faq.question}</Text>
              <Text className={styles.faqTag}>{faq.category}</Text>
            </View>
            {expandedFaq === faq.id && (
              <Text className={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>💊</Text>医嘱回顾
          </Text>
        </View>
        <View className={styles.instructionRecap}>
          {mockDoctorInstructions.slice(0, 5).map((ins) => (
            <View className={styles.recapItem} key={ins.id}>
              <View className={styles.recapDot} />
              <Text className={styles.recapText}>{ins.content}</Text>
              <Text className={styles.recapDate}>{ins.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ReportPage;
