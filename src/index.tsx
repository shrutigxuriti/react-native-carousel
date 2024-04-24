import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';

interface ImageCarouselProps {
  images: any;
  height: number;
  width: number;
  inactiveDotColor?: string;
  activeDotColor?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  carouselTiming?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height,
  width,
  activeDotColor = '#333333',
  inactiveDotColor = '#BCBCBC',
  resizeMode = 'cover',
  carouselTiming = 1000,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextPageIndex = (currentPage + 1) % images.length;
        scrollViewRef.current.scrollTo({
          x: nextPageIndex * screenWidth,
          animated: true,
        });
      }
    }, carouselTiming);

    return () => clearInterval(interval);
  }, [currentPage, images.length, screenWidth, carouselTiming]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const currentPageIndex = Math.round(contentOffset.x / screenWidth);
    setCurrentPage(currentPageIndex);
  };

  const scrollToPage = (pageIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: pageIndex * screenWidth,
        animated: true,
      });
      setCurrentPage(pageIndex);
    }
  };

  return (
    <View style={[styles.container, { height, width }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image: any, _: any) => (
          <Image
            key={image}
            source={image}
            style={{ height, width }}
            resizeMode={resizeMode}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_: any, index: any) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  currentPage === index ? activeDotColor : inactiveDotColor,
              },
            ]}
            onTouchStart={() => scrollToPage(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginTop: 10,
  },
});

export default ImageCarousel;
