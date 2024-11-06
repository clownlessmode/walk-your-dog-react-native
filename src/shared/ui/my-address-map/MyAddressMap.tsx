import React, { useRef } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import Header from '../header/Header';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '../containers/ScreenContainer';
import styles from './styles';
interface Coordinates {
  lat: number;
  lon: number;
}

interface Location {
  coordinates: Coordinates;
  address?: string;
}

interface YandexMapComponentProps {
  title?: string;
  apiKey: string;
  initialLocation?: Coordinates;
  onLocationSelect?: (location: Location) => void;
  customMapStyle?: string;
  markerIcon?: string;
}

interface WebViewMessage {
  type: 'locationSelected';
  coordinates?: Coordinates;
  address?: string;
}

const MyAddressMap: React.FC<YandexMapComponentProps> = ({
  apiKey,
  title,
  initialLocation = { lat: 55.751574, lon: 37.573856 },
  onLocationSelect,
  customMapStyle = '',
  markerIcon = '',
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
              ${markerIcon ? `
                iconLayout: 'default#image',
                iconImageHref: '${markerIcon}',
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -25]
              ` : ''}
            });
            map.geoObjects.add(placemark);

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
      }
    } catch (error) {
      console.error('Ошибка при обработке сообщения из WebView:', error);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <Header style={{ paddingHorizontal: 15 }} before={<GoBack />}>
        {title}
      </Header>
      <WebView
        ref={webViewRef}
        source={{ html: mapHTML }}
        style={styles.map}
        onMessage={onWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
      />
    </ScreenContainer>
  );
};

export default MyAddressMap;
