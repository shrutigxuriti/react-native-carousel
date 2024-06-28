import * as React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import ImageCarousel from 'react-native-custom-image-carousel';

export default function App() {
  const images = [
    require('../assets/image1.jpg'),
    require('../assets/image2.jpg'),
    require('../assets/image3.jpg'),
  ];
  const videos = [
    'qVQZLA_Noi0?si=pWENR_3O9Rq4O7q-'
  ]
  const { width: screenWidth } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <ImageCarousel
        images={images}
        videos={videos}
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
