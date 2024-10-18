import NavigationProvider from '@app/providers/navigation/Navigation';
import useUserStore from '@entity/users/user.store';
import { useLoadFonts } from '@shared/hooks/useLoadFonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const { isHydrated } = useUserStore()
  const { fontsLoaded, onLayoutRootView, isReady } = useLoadFonts();
  const queryClient = new QueryClient({});
  if (!fontsLoaded && isReady && !isHydrated) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <NavigationProvider />
          <StatusBar style="auto" />
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}