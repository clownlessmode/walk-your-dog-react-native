import React from 'react'
import { Text, View } from 'react-native'
import Button from '../button/Button'
interface Props {
    title: string;
    price?: string;
    onSelect: () => void;
}
function Prizes({title, price, onSelect}: Props) {
  return (
    <View>
        <Text>{title}</Text>
        <Text>от 3000 </Text>
        <Button onPress={onSelect}>Выбрать</Button>
    </View>
  )
}

export default Prizes