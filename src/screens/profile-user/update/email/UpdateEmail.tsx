// import { AntDesign } from '@expo/vector-icons';
// import { useAppNavigation } from '@shared/hooks/useAppNavigation';
// import Button from '@shared/ui/button/Button';
// import ScreenContainer from '@shared/ui/containers/ScreenContainer';
// import Description from '@shared/ui/description/Description';
// import Header from '@shared/ui/header/Header';
// import Input from '@shared/ui/input/Input';
// import { useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import useUpdateTelephoneStore from './update-telephone.store';
// interface FormData {
//   updateTelephone: any;
// }
// function UpdateEmail() {
//   const navigation = useAppNavigation();
//   const {setUpdateTelephone} = useUpdateTelephoneStore()
//   const { control, handleSubmit, formState, reset } = useForm<FormData>({
//     defaultValues: {
//       updateTelephone: '+7',
//     },
//   });

//   const onSubmit = (data: FormData) => {
//     setUpdateTelephone(data.updateTelephone);
//     navigation.navigate('verifySmsTelephone');
//   };
//   return (
//     <ScreenContainer style={{ gap: 14 }}>
//       <Header after={<AntDesign name="close" size={20} color="black" />}>
//         Главное - безопасность
//       </Header>
//       <Description>
//         Введите новый номер, мы отправим на него код подтверждения
//       </Description>
//       <Controller
//         name="updateTelephone"
//         control={control}
//         render={({ field: { onChange, value } }) => (
//           <Input placeholder="Номер телефона" keyboardType="phone-pad" value={value} onChangeText={onChange}/>
//         )}
//       />
//       <Button onPress={handleSubmit(onSubmit)}>
//         Получить код
//       </Button>
//     </ScreenContainer>
//   );
// }

// export default UpdateEmail;
