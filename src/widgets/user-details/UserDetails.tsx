import { User } from '@entity/users/model/user.interface'
import DetailsItem from '@shared/ui/details-item/DetailsItem'
import { petCount } from '@shared/utils/petCount'
import { Text, View } from 'react-native'
import styles from './styles'
import globalStyles from '@shared/constants/globalStyles'
import normalizeData from '@shared/utils/normalizeDate'
import Logout from '@features/logout/Logout'
interface Props {
  user: User
}
const UserDetails = ({user} : Props) => {
  return (
    <View style={styles.wrapper}>
      <DetailsItem title='Имя' description={user.meta.name} />
      <DetailsItem title='Телефон' description={user.meta.telephone} />
      <DetailsItem title='Email' description={user.meta.email} />
      <DetailsItem title='Способы оплаты' description={'MIR'} />
      <DetailsItem title='Активные абонементы' description={'Активные абонементы'} />
      {/* <DetailsItem title='Мои питомцы' description={petCount(user.pets.length)} /> */}
      <DetailsItem title='Мои адреса' description={user.meta.address ? user.meta.address : "Нет адресов"} />
      <DetailsItem title='Бонусная программа' description='Как она работает?' />
      <DetailsItem title='Город' description={user.meta.city} />
      <DetailsItem title='Сколько времени вы с нами' description={normalizeData(user.created_at)} />
      <Text style={globalStyles.text500}>Благотворительность</Text>
      <Text style={globalStyles.text500}>Помощь и документация</Text>
      <Logout />
    </View>
  )
}
export default UserDetails