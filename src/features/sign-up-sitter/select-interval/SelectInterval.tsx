import SelectedTime from '@features/selected-time/SelectedTime';
import React from 'react';
import SelectDay from './components/SelectDay';
import SelectTime from './components/SelectTime';
import Button from '@shared/ui/button/Button';
import { View } from 'react-native';
interface Interval {
  days?: number[];
  start?: string;
  end?: string;
}
interface SelectIntervalProps {
  onChange?: (value: Interval) => void;
  value?: Interval;
}
function SelectInterval({ onChange, value }: SelectIntervalProps) {
  const handleDaysChange = (selectedDays: number[]) => {
    if (onChange) {
      onChange({ ...value, days: selectedDays });
    }
  };

  const handleTimeChange = (start: string, end: string) => {
    if (onChange) {
      onChange({ ...value, start, end });
    }
  };
  return (
    <View style={{ gap: 20, paddingBottom: 20 }}>
      <SelectDay onChange={handleDaysChange} value={value?.days} />
      <SelectTime
        onChange={handleTimeChange}
        value={{ start: value?.start, end: value?.end }}
      />
      {/* <Button>Сохранить</Button> */}
    </View>
  );
}

export default SelectInterval;
