import React, { useRef } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import Header from '../header/Header';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '../containers/ScreenContainer';
import styles from './styles';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface Coordinates {
  lat: number;
  lon: number;
}

interface Location {
  coordinates: Coordinates;
  address?: string;
}

interface YandexMapComponentProps {
  needHeader?: boolean;
  title?: string;
  apiKey: string;
  initialLocation?: Coordinates;
  onLocationSelect?: (location: Location) => void;
  customMapStyle?: string;
  markerIcon?: string;
  onMarkerPress?: () => void;
}

interface WebViewMessage {
  type: 'locationSelected' | 'markerClicked'; // Добавляем возможные значения type
  coordinates?: Coordinates; // Оставляем, если locationSelected передает координаты
  address?: string;
}

const MyAddressMap: React.FC<YandexMapComponentProps> = ({
  apiKey,
  title,
  initialLocation = { lat: 55.751574, lon: 37.573856 },
  onLocationSelect,
  customMapStyle = '',
  markerIcon = '',
  needHeader = true,
  onMarkerPress,
}) => {
  const webViewRef = useRef<WebView>(null);

  const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU" type="text/javascript"></script>
        <style>
          html, body, #map {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script type="text/javascript">
          ymaps.ready(() => {
            const map = new ymaps.Map('map', {
              center: [${initialLocation.lat}, ${initialLocation.lon}],
              zoom: 15,
              controls: ['zoomControl']
            });

            let customStyle = ${customMapStyle ? JSON.stringify(customMapStyle) : '{}'};
            if (Object.keys(customStyle).length > 0) {
              map.panes.get('ground').getElement().style.filter = 
                'grayscale(100%) brightness(${customMapStyle || 100}%)';
            }

            const placemark = new ymaps.Placemark([${initialLocation.lat}, ${initialLocation.lon}], {}, {
              draggable: false,
              ${
                markerIcon
                  ? `
                iconLayout: 'default#image',
                iconImageHref: '${markerIcon}',
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -25]
              `
                  : ''
              }
            });
            map.geoObjects.add(placemark);

             placemark.events.add('click', () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'markerClicked',
      }));
    });

            map.controls.remove('routeButtonControl');
            map.controls.remove('trafficControl');
            map.controls.remove('searchControl');
          });
        </script>
      </body>
    </html>
  `;

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data: WebViewMessage = JSON.parse(event.nativeEvent.data);
      if (data.type === 'locationSelected' && data.coordinates) {
        onLocationSelect &&
          onLocationSelect({
            coordinates: data.coordinates,
            address: data.address || 'Не удалось получить адрес',
          });
      } else if (data.type === 'markerClicked') {
        // Обработка нажатия на маркер
        if (onMarkerPress) {
          onMarkerPress();
        }
      }
    } catch (error) {
      console.error('Ошибка при обработке сообщения из WebView:', error);
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingBottom: 15,
        paddingTop: needHeader ? insets.top + 10 : 0,
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      {needHeader && (
        <Header style={{ paddingHorizontal: 15 }} before={<GoBack />}>
          {title}
        </Header>
      )}
      <WebView
        ref={webViewRef}
        source={{ html: mapHTML }}
        style={styles.map}
        onMessage={onWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
      />
    </View>
  );
};

export default MyAddressMap;
