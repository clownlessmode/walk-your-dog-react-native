import { useAuthController } from '@entity/auth/auth.controller';
import { VerifyCodeRo } from '@entity/auth/model/auth.interface';
import { useUpdateController } from '@entity/update-telephone/update-telephone.controller';
import useUserStore from '@entity/users/user.store';
import useTelephoneStore from '@screens/auth/telephone.store';
import useUpdateTelephoneStore from '@screens/profile/update/telephone/update-telephone.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Error from '@shared/ui/error/Error';
import Otp from '@shared/ui/otp/Otp';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
interface FormData {
    telephone: string
  code: string;
}
function Form() {
  const navigation = useAppNavigation();
  const [timeLeft, setTimeLeft] = useState(60);
  const { user, setUser, updateNumber } = useUserStore();
  const [isTimerActive, setIsTimerActive] = useState(true);
  const { verifyCode, isAuthLoading, error, updateUser} = useUpdateController(user?.id);
  const { updateTelephone } = useUpdateTelephoneStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
    telephone: updateTelephone as string,
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
    if (!updateTelephone) {
      return null;
    }
    const response = await verifyCode({ telephone: updateTelephone });
    console.info('Код повторно отправлен на', updateTelephone);
    setTimeLeft(60);
    setIsTimerActive(true);
  };

  const onSubmit = async (data: FormData) => {
    if (!updateTelephone) {
      return null;
    }
    const res = await updateUser(data)
    updateNumber(res.meta.telephone)
    console.info(data)
    navigation.navigate('successUpdate');
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
            <ActivityIndicator size="small" color="#9D9D9D"/>
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
            Код отправлен на {updateTelephone}
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
