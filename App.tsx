import registerNNPushToken from 'native-notify';
import NavigationProvider from '@app/providers/navigation/Navigation';
import useUserStore from '@entity/users/user.store';
import { useLoadFonts } from '@shared/hooks/useLoadFonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ToastConfig from '@shared/ui/toast/Toast';
import setupErrorHandling from '@app/providers/errors/setupErrorHandling';
import { SocketProvider } from '@app/providers/SocketContext';

export default function App() {
  setupErrorHandling();

  registerNNPushToken(24230, 'F4CZByJ4fRNUi31zZPdEBp');
  const { isHydrated } = useUserStore();
  const { fontsLoaded, onLayoutRootView, isReady } = useLoadFonts();
  const queryClient = new QueryClient({});
  if (!fontsLoaded && isReady && !isHydrated) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationProvider />
            <StatusBar style="auto" />
            <Toast config={ToastConfig} />
          </View>
        </SocketProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
