import * as React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import ImageCarousel from 'react-native-carousel';

export default function App() {
  const images = [
    require('../assets/image1.jpg'),
    require('../assets/image2.jpg'),
    require('../assets/image3.jpg'),
  ];
  const { width: screenWidth } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <ImageCarousel
        images={images}
        height={300}
        width={screenWidth - 20}
        carouselTiming={2000}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
