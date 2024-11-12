import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { Screens } from '@shared/types/screens.type';
import React, { useEffect, useState } from 'react';
import { Platform, View, ActivityIndicator, StyleSheet, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

type PaymentProp = RouteProp<Screens, 'webViewPayment'>;

function WebViewPayment() {
  const navigation = useAppNavigation();
  const route = useRoute<PaymentProp>();
  const { uri } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  // Обработка навигации по URL
  const handleNavigationChange = (url: string) => {
    // Используем вашу схему "wyd"
    if (url.includes('exp://localhost:8081/payment/success')) {
      navigation.navigate('payment', { variant: 'success' });
    } else if (url.includes('exp://localhost:8081/payment/error')) {
      navigation.navigate('payment', { variant: 'error' });
    } else if (url.includes('exp://localhost:8081/payment/cancel')) {
      navigation.navigate('appStack');
    }
  };

  // Обработка кнопки "назад" на Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('appStack');
        return true;
      });

      return () => backHandler.remove();
    }
  }, []);

  // iOS WebBrowser
  useEffect(() => {
    if (Platform.OS === 'ios') {
      const openBrowserAsync = async () => {
        try {
          await WebBrowser.warmUpAsync();
          const result = await WebBrowser.openAuthSessionAsync(
            uri,
            'exp://localhost:8081'
          );
          await WebBrowser.coolDownAsync();
          
          if (result.type === 'success' && result.url) {
            handleNavigationChange(result.url);
          } else if (result.type === 'cancel') {
            navigation.navigate('appStack');
          }
        } catch (error) {
          console.error('Browser Error:', error);
          navigation.navigate('appStack');
        }
      };
      
      openBrowserAsync();
      
      return () => {
        WebBrowser.coolDownAsync();
      };
    }
  }, [uri]);

  // JavaScript для отслеживания URL в WebView
  const injectedJavaScript = `
    (function() {
      function wrap(fn) {
        return function wrapper() {
          var res = fn.apply(this, arguments);
          window.ReactNativeWebView.postMessage(window.location.href);
          return res;
        }
      }
      history.pushState = wrap(history.pushState);
      history.replaceState = wrap(history.replaceState);
      window.addEventListener('popstate', function() {
        window.ReactNativeWebView.postMessage(window.location.href);
      });
    })();
    true;
  `;

  const onMessage = (event: { nativeEvent: { data: string } }) => {
    handleNavigationChange(event.nativeEvent.data);
  };

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri }}
          style={styles.webview}
          originWhitelist={['*']}
          useWebView2={true}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onNavigationStateChange={(navState) => handleNavigationChange(navState.url)}
          onMessage={onMessage}
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  }

  // iOS loading view
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default WebViewPayment;

