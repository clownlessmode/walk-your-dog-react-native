import { Pet } from '@entity/pets/model/pet.interface'
import DetailsItem from '@shared/ui/details-item/DetailsItem'
import { formatDate } from '@widgets/date-event-block/DateEventBlock';
import React from 'react'
import { View } from 'react-native';
interface Props {
    pet: Pet
}
function PetCard({pet}: Props) {
    const { parameters } = pet;

  return (
    <View style={{gap: 10}}>
       <DetailsItem title="Домашнее имя" description={parameters.homeName} />
      <DetailsItem title="Окрас" description={parameters.colorPet} />
      <DetailsItem title="Вес" description={parameters.weight} />
      <DetailsItem title="Клеймо" description={parameters.mark} />
      <DetailsItem title="Место клеймения" description={parameters.placeMark} />
      <DetailsItem title="Дата последней вакцинации" description={parameters.lastDayVaccine} />
      <DetailsItem title="Дата дегельминтизации и препарат" description={parameters.demorwAndPreparation} />
      <DetailsItem title="Перенесенные операции и дата, осложнения" description={parameters.operationsAndComplications} />
      <DetailsItem title="Перенесенные заболевания и дата, осложнения. Беспокоит ли это сегодня." description={parameters.diseasesAndBoters} />
      <DetailsItem title="Развязан" description={parameters.untied ? 'Да' : 'Нет'} />
      <DetailsItem title="Дата последней пустовки или щенения" description={'govno ebuchie'} />
      <DetailsItem title="Особые приметы" description={parameters.specialSigns} />
      <DetailsItem title="Рацион питания" description={parameters.diet?.join(', ')} />
      <DetailsItem title="Любимые лакомства" description={parameters.favoriteTreats} />
      <DetailsItem title="Опыт разлуки с хозяином" description={parameters.separationExperience ? 'Да' : 'Нет'} />
      <DetailsItem title="Поведение в одиночестве" description={parameters.behaviorAlone} />
      <DetailsItem title="Характер" description={parameters.characterTraits} />
      <DetailsItem title="Что любит (Игры, ритуалы)" description={parameters.whatLoves} />
      <DetailsItem title="Что не любит" description={parameters.whatDoesntLove} />
      <DetailsItem title="Дрессировка" description={parameters.training} />
      <DetailsItem title="Знания команд" description={parameters.knowledgeTraining} />
      <DetailsItem title="Отношение к людям" description={parameters.attitudePeople} />
      <DetailsItem title="Отношение к собакам" description={parameters.attitudeDogs} />
      <DetailsItem title="Знание поводка" description={parameters.knowLeash ? 'Да' : 'Нет'} />
      <DetailsItem title="Знание намордника" description={parameters.knowMuzzle ? 'Да' : 'Нет'} />
      <DetailsItem title="Отказ от намордника" description={parameters.refusalMuzzle} />
      <DetailsItem title="Вредные привычки" description={parameters.badHabits} />
      <DetailsItem title="Количество прогулок в сутки (обычный режим вашего питомца)" description={parameters.numberWalks} />
      <DetailsItem title="Время выгулов и продолжительность" description={parameters.walkingTime} />
      <DetailsItem title="Особенности выгула" description={parameters.walkingFeatures} />
      <DetailsItem title="Особые пожелания" description={parameters.specialRequests} />
      <DetailsItem title="Контактные телефоны и мессенджеры" description={parameters.preferredMessenger} />
      <DetailsItem title="Собака возвращается только к хозяину" description={parameters.returnOwner ? 'Да' : 'Нет'} />
      <DetailsItem title="Доверенное лицо" description={parameters.trustedPerson} />
     </View>
  )
}

export default PetCard