import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    "Raleway-Black": require("@assets/fonts/RalewayBlack.ttf"), //900
    "Raleway-Bold": require("@assets/fonts/RalewayBold.ttf"), //700
    "Raleway-ExtraBold": require("@assets/fonts/RalewayExtraBold.ttf"), //800
    "Raleway-Light": require("@assets/fonts/RalewayLight.ttf"), //300
    "Raleway-ExtraLight": require("@assets/fonts/RalewayExtraLight.ttf"), //200
    "Raleway-Medium": require("@assets/fonts/RalewayMedium.ttf"), //500
    "Raleway-Regular": require("@assets/fonts/RalewayRegular.ttf"), //400
    "Raleway-SemiBold": require("@assets/fonts/RalewaySemiBold.ttf"), //600
    "Raleway-Thin": require("@assets/fonts/RalewayThin.ttf"), //100
  });

  const [isReady, setIsReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    try {
      if (fontsLoaded) {
        setIsReady(true);
        await SplashScreen.hideAsync(); // Скрываем Splash Screen после загрузки шрифтов
      }
    } catch (error) {
      console.error("Error hiding splash screen:", error); // Ловим ошибки
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const preventAutoHide = async () => {
        await SplashScreen.preventAutoHideAsync();
    };

    preventAutoHide();
  }, []);

  return { fontsLoaded, isReady, onLayoutRootView };
};
