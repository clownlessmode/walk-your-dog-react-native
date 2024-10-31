import useUserStore from '@entity/users/user.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import axios from 'axios';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Logout = () => {
    const navigation = useAppNavigation()
    const {setUser, setToken} = useUserStore()
    const onSubmit = () => {
        setUser(null);
        setToken(null);
        navigation.navigate("identity")
    }
  return (
    <TouchableOpacity onPress={onSubmit}>
      <Text style={globalStyles.text500}>Выйти из аккаунта</Text>
    </TouchableOpacity>
  );
};

export default Logout;
