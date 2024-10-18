import { ImageSourcePropType } from "react-native";

export interface Slide {
  image: ImageSourcePropType;
}

const slides: Slide[] = [
  {
    image: require("@assets/screens/onboarding/one-slide.png"),
  },
  {
    image: require("@assets/screens/onboarding/two-slide.png"),
  },
  {
    image: require("@assets/screens/onboarding/three-slide.png"),
  },
  {
    image: require("@assets/screens/onboarding/four-slide.png"),
  },
];

export default slides;
