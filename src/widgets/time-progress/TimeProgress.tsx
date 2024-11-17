import globalStyles from '@shared/constants/globalStyles';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import useTimerStore from './time.store';
interface Props {
  serviceId: string;
}
const TimerProgress = ({serviceId}: Props) => {
  const { timers  } = useTimerStore();

  const timeLeft = timers[serviceId]?.timeLeft ?? 0;

  const totalMinutes = 30;
  const percentage = useMemo(() => (timeLeft / (totalMinutes * 60)) * 100, [timeLeft]);
  const radius = 70;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const borderColor =
    percentage < 25 ? '#FF4500' : percentage < 50 ? '#FFD700' : '#76D219';

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Svg height="150" width="150" viewBox="0 0 150 150">
          <Circle
            cx="75"
            cy="75"
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="75"
            cy="75"
            r={radius}
            stroke={borderColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="75, 75"
          />
          <SvgText
            x="75"
            y="75"
            textAnchor="middle"
            dy="5"
            fontSize="18"
            fill="#000"
          >
            {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          </SvgText>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 16,
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    ...globalStyles.text500,
  },
  progressContainer: {
    alignItems: 'center',
  },
  timeText: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
});

export default TimerProgress;
