import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import Header from '../header/Header';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '../containers/ScreenContainer';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../input/Input';
import SearchInput from '../search-input/SearchInput';
import styles from './styles';

interface Coordinates {
  lat: number;
  lon: number;
}

interface Location {
  coordinates: Coordinates;
  address?: string;
}

interface SearchResult {
  address: string;
  coordinates: Coordinates;
}

interface YandexMapComponentProps {
  apiKey: string;
  initialLocation?: Coordinates;
  onLocationSelect?: (location: Location) => void;
  mode?: 'edit' | 'view';
  customMapStyle?: string;
  markerIcon?: string;
}

interface WebViewMessage {
  type: 'locationSelected' | 'searchResults';
  coordinates?: Coordinates;
  address?: string;
  results?: SearchResult[];
}

const YaMap: React.FC<YandexMapComponentProps> = ({
  apiKey,
  initialLocation = { lat: 55.751574, lon: 37.573856 },
  onLocationSelect,
  mode = 'edit',
  customMapStyle = '',
  markerIcon = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] =
    useState<Coordinates>(initialLocation);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const webViewRef = useRef<WebView>(null);

  // HTML для WebView с картой Яндекс
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
          .map-marker {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            pointer-events: none;
            ${
              markerIcon
                ? `
              background-image: url('${markerIcon}');
              background-size: contain;
              background-repeat: no-repeat;
              width: 50px;
              height: 50px;
            `
                : `
              width: 20px;
              height: 20px;
              background-color: red;
              border-radius: 50%;
              border: 2px solid white;
            `
            }
          }
        </style>
      </head>
      <body>
        ${mode === 'edit' ? '<div class="map-marker"></div>' : ''}
        <div id="map"></div>
        <script type="text/javascript">
          let map;
          let placemark;
          let customStyle = ${customMapStyle ? JSON.stringify(customMapStyle) : '{}'};

ymaps.ready(() => {
  map = new ymaps.Map('map', {
    center: [${initialLocation.lat}, ${initialLocation.lon}],
    zoom: 15,
    controls: ['zoomControl']
  });

  // Применяем кастомный стиль, если он есть
  if (Object.keys(customStyle).length > 0) {
    map.panes.get('ground').getElement().style.filter = 
      'grayscale(100%) brightness(${customMapStyle || 100}%)';
  }

  ${
    mode === 'view'
      ? `
    placemark = new ymaps.Placemark([${initialLocation.lat}, ${initialLocation.lon}], {}, {
      draggable: false,
      ${
        markerIcon
          ? `iconLayout: 'default#image',
      iconImageHref: '${markerIcon}',
      iconImageSize: [32, 32],
      iconImageOffset: [-16, -16]`
          : ''
      }
    });
    map.geoObjects.add(placemark);
  `
      : ''
  }

  // Отключаем ненужные элементы управления
  map.controls.remove('routeButtonControl');
  map.controls.remove('trafficControl');
  map.controls.remove('searchControl');

  let geocodeTimeout;

  ${
    mode === 'edit'
      ? `
    // Обработчик движения карты
    map.events.add('boundschange', function() {
      const coordinates = map.getCenter();
      
      // Если таймер уже существует, очистим его
      if (geocodeTimeout) {
        clearTimeout(geocodeTimeout);
      }
      
      // Устанавливаем новый таймер для задержки запроса на 5 секунд
      geocodeTimeout = setTimeout(() => {
        reverseGeocode(coordinates);
      }, 2000); // Задержка в 5 секунд
    });

    // Функция для обратного геокодирования
    function reverseGeocode(coords) {
      ymaps.geocode(coords, {
        results: 5,         // Возвращаем только один наиболее подходящий результат
        kind: 'house'       // Ограничиваем поиск до домов (можно попробовать другие значения: 'street', 'metro', и т.д.)
      }).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject ? firstGeoObject.getAddressLine() : '';
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'locationSelected',
          coordinates: {
            lat: coords[0],
            lon: coords[1]
          },
          address: address
        }));
      });
    }
  `
      : ''
  }
});
  
            // Функция для поиска адреса с предложениями
            function searchAddress(query) {
              ymaps.geocode(query, { results: 5, kind: 'house' }).then(function (res) {
                const results = [];
                for (let i = 0; i < res.geoObjects.getLength(); i++) {
                  const obj = res.geoObjects.get(i);
                  const coords = obj.geometry.getCoordinates();
                  results.push({
                    address: obj.getAddressLine(),
                    coordinates: {
                      lat: coords[0],
                      lon: coords[1]
                    }
                  });
                }
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'searchResults',
                  results: results
                }));
              });
            }
  
            function setMapCenter(lat, lon) {
              map.setCenter([lat, lon], 15);
            }
          </script>
        </body>
      </html>
    `;

  // Функция для получения предложений при вводе текста
  const fetchSuggestions = async (query: string) => {
    if (isSearchActive && query.trim().length > 2) {
      // Проверяем, активен ли поиск
      try {
        webViewRef.current?.injectJavaScript(`
          searchAddress("${query}");
        `);
      } catch (error) {
        console.error('Ошибка при запросе предложений:', error);
      }
    } else {
      setSearchResults([]); // Очищаем результаты поиска, если запрос слишком короткий или поиск неактивен
    }
  };

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    fetchSuggestions(text); // Вызываем функцию для получения предложений
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    webViewRef.current?.injectJavaScript(
      `setMapCenter(${result.coordinates.lat}, ${result.coordinates.lon});`
    );
    setSearchResults([]);
    setSearchQuery(result.address);
  };

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data: WebViewMessage = JSON.parse(event.nativeEvent.data);
      if (data.type === 'locationSelected' && data.coordinates) {
        setSelectedLocation(data.coordinates);
        onLocationSelect &&
          onLocationSelect({
            coordinates: data.coordinates,
            address: data.address || 'Не удалось получить адрес', // Проверяем адрес на наличие значения
          });
      } else if (data.type === 'searchResults' && data.results) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error('Ошибка при обработке сообщения из WebView:', error);
    }
  };

  const [isSearchActive, setIsSearchActive] = useState(false);
  const handleSearchToggle = () => {
    if (isSearchActive) {
      setSearchQuery(''); // Очистить поле поиска при закрытии
      setSearchResults([]); // Очистить результаты поиска
    }
    setIsSearchActive((prev) => !prev); // Переключаем состояние поиска
  };
  return (
    <ScreenContainer style={styles.container}>
      {mode === 'edit' && (
        <Header
          before={<GoBack />}
          after={
            <TouchableOpacity onPress={handleSearchToggle}>
              {isSearchActive ? (
                <></>
              ) : (
                <MaterialIcons
                  name="search"
                  size={isSearchActive ? 0 : 24}
                  color="black"
                />
              )}
            </TouchableOpacity>
          }
        >
          {!isSearchActive ? (
            'Выбрать адрес'
          ) : (
            <SearchInput
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              placeholder="Введите адрес"
            />
          )}
        </Header>
      )}
      {isSearchActive && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            {/* <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchInputChange} // Теперь вызываем при каждом изменении текста
              placeholder="Введите адрес для поиска"
              placeholderTextColor="#999"
            /> */}

            {searchResults.length > 0 && (
              <FlatList
                style={styles.searchResults}
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.searchResultItem}
                    onPress={() => handleSelectSearchResult(item)}
                  >
                    <Text numberOfLines={2}>{item.address}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
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
    </ScreenContainer>
  );
};



export default YaMap;
