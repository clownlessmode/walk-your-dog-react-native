import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';

export interface Ticket {
  id?: string 
  count?: number;
  total: number;
  title: string;
  date?: Date;
  isPreview?: boolean;
}

export default function Ticket({
  count,
  total,
  title,
  date,
  isPreview = false,
}: Ticket) {
  const displayDate =
    date ?? new Date(new Date().setDate(new Date().getDate() + 365));
  // displayDate.setDate(displayDate.getDate() + 30)
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(displayDate);

  const percentage = (count ? count / total : 0) * 100;
  const circleColor =
    percentage < 25 ? '#FF4500' : percentage < 50 ? '#FFD700' : '#00CC66';

  const radius = 28;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={{ paddingVertical: 8 }}>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>
          {title} ({total} разовых услуг) 
          </Text>
          <Text style={[globalStyles.text500, {opacity: 0.5 }]}>
            Срок действия:
          </Text>
          <Text
           style={[globalStyles.text500, {fontSize: 16}]}
          >{`до ${formattedDate}`}</Text>
        </View>
        <View style={styles.circleContainer}>
          <Svg height="70" width="70" viewBox="0 0 60 60">
            <Circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#E0E0E0"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx="30"
              cy="30"
              r={radius}
              stroke={circleColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="30, 30"
            />
            <SvgText
              x="30"
              y="30"
              textAnchor="middle"
              dy="5"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
            >
              {`${count} / ${total}`}
            </SvgText>
          </Svg>
        </View>
      </View>
    </View>
  );
}
