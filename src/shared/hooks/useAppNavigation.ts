import {useNavigation} from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screens } from '@shared/types/screens.type';

type AppNavigationProp = NativeStackNavigationProp<Screens>

export const useAppNavigation = () => useNavigation<AppNavigationProp>()