import React, { useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import { mockAppointments, mockCalendarEvents } from '@/data/appointments';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const AppointmentPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const { doctorInstructions, toggleDoctorInstruction } = useAppStore();

  const calendarDays = useMemo(() => {
    const { year, month } = currentMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const today = new Date();
    const days: Array<{
      day: number;
      isToday: boolean;
      events: typeof mockCalendarEvents;
    } | null> = [];

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const events = mockCalendarEvents.filter((e) => e.date === dateStr);
      const isToday =
        today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
      days.push({ day: d, isToday, events });
    }
    return days;
  }, [currentMonth]);

  const monthLabel = `${currentMonth.year}年${currentMonth.month + 1}月`;

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const m = prev.month - 1;
      if (m < 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: m };
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const m = prev.month + 1;
      if (m > 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: m };
    });
  };

  const toggleInstruction = (id: string) => {
    toggleDoctorInstruction(id);
  };

  const typeConfig = {
    checkup: { label: '常规复诊', style: styles.typeCheckup, cardStyle: '' },
    phase_change: { label: '阶段评估', style: styles.typePhaseChange, cardStyle: styles.appointmentCardPhase },
    adjust: { label: '调整力度', style: styles.typeAdjust, cardStyle: styles.appointmentCardAdjust },
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>复诊安排 📅</Text>
        <Text className={styles.headerDesc}>月历查看复诊节点，医嘱清单随时回顾</Text>
      </View>

      <View className={styles.calendar}>
        <View className={styles.calendarHeader}>
          <View className={styles.calendarNavBtn} onClick={handlePrevMonth}>
            <Text className={styles.calendarNavText}>‹</Text>
          </View>
          <Text className={styles.calendarMonth}>{monthLabel}</Text>
          <View className={styles.calendarNavBtn} onClick={handleNextMonth}>
            <Text className={styles.calendarNavText}>›</Text>
          </View>
        </View>
        <View className={styles.calendarWeekRow}>
          {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
            <Text className={styles.calendarWeekLabel} key={d}>{d}</Text>
          ))}
        </View>
        {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, i) => (
          <View className={styles.calendarRow} key={i}>
            {calendarDays.slice(i * 7, (i + 1) * 7).map((item, j) =>
              item ? (
                <View
                  key={j}
                  className={classnames(styles.calendarDay, item.isToday && styles.calendarDayToday)}
                >
                  <Text className={styles.calendarDayNum}>{item.day}</Text>
                  {item.events.map((e, k) => (
                    <View
                      key={k}
                      className={classnames(
                        styles.calendarDot,
                        e.type === 'appointment' && styles.dotAppointment,
                        e.type === 'phase_change' && styles.dotPhase,
                        e.type === 'emergency' && styles.dotEmergency
                      )}
                    />
                  ))}
                </View>
              ) : (
                <View className={styles.calendarDayEmpty} key={j} />
              )
            )}
          </View>
        ))}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>🏥</Text>近期复诊
          </Text>
        </View>
        {mockAppointments.map((ap) => {
          const config = typeConfig[ap.type];
          return (
            <View
              key={ap.id}
              className={classnames(styles.appointmentCard, config.cardStyle)}
            >
              <View className={styles.appointmentDate}>
                <Text className={styles.appointmentDateText}>{ap.date}</Text>
                <Text className={styles.appointmentTime}>{ap.time}</Text>
                <Text className={classnames(styles.appointmentType, config.style)}>
                  {config.label}
                </Text>
              </View>
              <Text className={styles.appointmentDoctor}>
                {ap.doctor} · {ap.hospital}
              </Text>
              <Text className={styles.appointmentNote}>{ap.note}</Text>
            </View>
          );
        })}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionEmoji}>💊</Text>医嘱清单
          </Text>
        </View>
        {doctorInstructions.map((ins) => (
          <View
            key={ins.id}
            className={styles.instructionItem}
            onClick={() => toggleInstruction(ins.id)}
          >
            <View
              className={classnames(
                styles.instructionCheck,
                ins.checked && styles.instructionChecked
              )}
            >
              {ins.checked && <Text className={styles.instructionCheckMark}>✓</Text>}
            </View>
            <View className={styles.instructionContent}>
              <Text
                className={classnames(
                  styles.instructionText,
                  ins.checked && styles.instructionTextDone
                )}
              >
                {ins.content}
              </Text>
              <Text className={styles.instructionDate}>{ins.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AppointmentPage;
