import { useAuthController } from '@entity/auth/auth.controller';
import { VerifyCodeRo } from '@entity/auth/model/auth.interface';
import useUserStore from '@entity/users/user.store';
import useRoleStore from '@screens/auth/role.store';
import useTelephoneStore from '@screens/auth/telephone.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Error from '@shared/ui/error/Error';
import Otp from '@shared/ui/otp/Otp';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
interface FormData {
  code: string;
}
function Form() {
  const navigation = useAppNavigation();
  const { role } = useRoleStore();
  const { setUser, setToken } = useUserStore();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const { verifyCode, isAuthLoading, error, preAuth } = useAuthController();
  const { telephone } = useTelephoneStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      code: '',
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleResendCode = async () => {
    if (!telephone) {
      return null;
    }
    const response = await preAuth({ telephone: telephone });
    console.info('Код повторно отправлен на', telephone);
    setTimeLeft(60);
    setIsTimerActive(true);
  };

  const onSubmit = async (data: FormData) => {
    if (!telephone) {
      return null;
    }
    const response = await verifyCode({
      telephone: telephone,
      code: data.code,
    });
    if (!response.user) {
      navigation.navigate('signUpUser');
      Toast.hide();
    } else {
      setUser(response.user);
      setToken(response.accessToken);
      navigation.navigate('appStack');
      Toast.hide();
    }
  };

  return (
    <>
      <View style={{ gap: 14 }}>
        <Text
          style={[globalStyles.text500, { fontSize: 20, textAlign: 'center' }]}
        >
          Введите код из СМС
        </Text>
        {!isAuthLoading ? (
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <Otp
                value={value}
                onChange={onChange}
                onComplete={() => handleSubmit(onSubmit)()}
              />
            )}
          />
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="small" color="#9D9D9D" />
          </View>
        )}
        {error && <Error title="Неверный СМС-код" />}

        <View>
          <Text
            style={[
              { opacity: 0.5, textAlign: 'center' },
              globalStyles.text400,
            ]}
          >
            Код отправлен на {telephone}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={[
                globalStyles.text400,
                { textAlign: 'center', color: '#2A2A2A' },
              ]}
            >
              Изменить номер
            </Text>
          </TouchableOpacity>
        </View>
        {isTimerActive == false ? (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={[globalStyles.text500, { textAlign: 'center' }]}>
              Запросить код повторно
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ textAlign: 'center', opacity: 0.5 }}>
            Получить новый код можно через {timeLeft}
          </Text>
        )}
      </View>
    </>
  );
}

export default Form;
