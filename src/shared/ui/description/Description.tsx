import React from 'react'
import { Text } from 'react-native'
import styles from './styles'
import globalStyles from '@shared/constants/globalStyles'
interface Props {
    children: React.ReactNode
}
function Description({children}: Props) {
  return (
    <Text style={[globalStyles.text400, styles.wrapper]}>{children}</Text>
  )
}

export default Description