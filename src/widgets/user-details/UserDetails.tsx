import { User } from '@entity/users/model/user.interface'
import DetailsItem from '@shared/ui/details-item/DetailsItem'
import { petCount } from '@shared/utils/petCount'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import globalStyles from '@shared/constants/globalStyles'
import normalizeData from '@shared/utils/normalizeDate'
import Logout from '@features/logout/Logout'
import { useAppNavigation } from '@shared/hooks/useAppNavigation'
import getAddressWord from '@shared/utils/addressWord'
import formatMapText from '@shared/utils/formatMapText'
import { abonementWorlds } from '@shared/utils/abonementWorlds'
import getAbonementCountWord from '@shared/utils/abonementCountWord'
interface Props {
  user: User
}
const UserDetails = ({user} : Props) => {
  const navigation = useAppNavigation()
  return (
    <View style={styles.wrapper}>
      <DetailsItem title='Имя' description={user.meta.name} />
      <DetailsItem link={() => navigation.navigate("updateTelephone")} title='Телефон' description={user.meta.telephone} />
      <DetailsItem title='Email' description={user.meta.email} />
      <DetailsItem link={() => navigation.navigate('deposit')} title='Баланс счета' description={'Пополнить счет'} />
      <DetailsItem link={() => navigation.navigate('abonements')} title='Активные абонементы' description={user.abonements.length !== 0 ? `${getAbonementCountWord(user.abonements.length)}` : 'Нет активных абонементов'} />
      <DetailsItem link={() => navigation.navigate('myPets')} title='Мои питомцы' description={`${petCount(user.pets.length)}`}/>
      <DetailsItem link={() => navigation.navigate('myAddresses')} title='Мои адреса' description={user.meta.addresses.length !== 0 ? `${getAddressWord(user.meta.addresses.length)}` : 'Нет адресов'}/>
      <DetailsItem link={() => navigation.navigate('bonusProgram')} title='Бонусная программа' description='Как она работает?' />
      <DetailsItem title='Город' description={user.meta.city} />
      <DetailsItem title='Сколько времени вы с нами' description={normalizeData(user.created_at)} />
      <DetailsItem link={() => navigation.navigate('paymentsHistory')} title='История счета' description={"Просмотреть историю счета"} />
      <Text style={globalStyles.text500}>Благотворительность</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('helpAndDocumentation')}>
      <Text style={globalStyles.text500}>Помощь и документация</Text>
      </TouchableOpacity>
      <Logout />
    </View>
  )
}
export default UserDetails