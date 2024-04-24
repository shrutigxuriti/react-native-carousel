# react-native-custom-image-carousel

## React Native Simple Carousel

The Image Carousel component is a React Native component designed to display a carousel of images with pagination dots at the bottom. It allows users to swipe through images horizontally or automatically cycle through them at a specified interval.

## Installation

```sh
npm install react-native-custom-image-carousel
```

## Usage

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageCarousel from 'react-native-custom-image-carousel';

const images = [
  require('./images/image1.jpg'),
  require('./images/image2.jpg'),
  require('./images/image3.jpg'),
];

const App = () => {
  return (
    <View style={styles.container}>
      <ImageCarousel
        images={images}
        height={200}
        width={300}
        inactiveDotColor="#BCBCBC"
        activeDotColor="#333333"
        resizeMode="cover"
        carouselTiming={3000} // Set to 0 to disable automatic scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

```

## Props
- `images`: An array of image sources.
- `height`: Height of the carousel.
- `width`: Width of the carousel.
- `inactiveDotColor`: Color of inactive pagination dots (optional, default: #BCBCBC).
- `activeDotColor`: Color of active pagination dot (optional, default: #333333).
- `resizeMode`: Image resize mode (optional, default: 'cover').
- `carouselTiming`: Interval in milliseconds for automatic carousel scrolling (optional, default: 1000). Set to 0 to disable automatic scrolling.

## Screenshots
![1000025126](https://github.com/shrutigxuriti/react-native-custom-image-carousel/assets/131851981/dca77f76-a081-4382-8979-6cb7acc0bb72)

https://github.com/shrutigxuriti/react-native-custom-image-carousel/assets/131851981/151d1eaf-4c0f-4e66-8780-ce60c05f3c04

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
