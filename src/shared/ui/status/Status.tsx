import React from 'react'
import { Status } from '@entity/service/model/service.interface';
import styles from './styles';
import { Text, View } from 'react-native';
interface Props {
    status: string
}
function StatusText({status}: Props) {
    let styleStatus;
  switch (status) {
    case Status.DONE:
      styleStatus = styles.done;
      break;
    case Status.IN_PROGRESS:
      styleStatus = styles.inProgress;
      break;
    case Status.CANCELLED:
      styleStatus = styles.cancelled;
      break;
    case Status.REPORT:
      styleStatus = styles.report;
      break;
      case Status.SEARCH:
      styleStatus = styles.search;
      break;
    default:
      styleStatus = styles.default;
  }

  const truncateString = (str: any, num: any) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };
  return (
    <View style={[styles.status, styleStatus]}>
        <Text style={styles.status}>{truncateString(status, 9)}</Text>
    </View>
  )
}

export default StatusText