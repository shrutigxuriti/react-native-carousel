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
import YoutubeIframe from 'react-native-youtube-iframe';

interface ImageCarouselProps {
  images?: any[];
  videos?: string[];
  height: number;
  width: number;
  inactiveDotColor?: string;
  activeDotColor?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  carouselTiming?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  videos = [],
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
  const media = [...images, ...videos]; // Combine images and videos

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextPageIndex = (currentPage + 1) % media.length;
        scrollViewRef.current.scrollTo({
          x: nextPageIndex * screenWidth,
          animated: true,
        });
      }
    }, carouselTiming);

    return () => clearInterval(interval);
  }, [currentPage, media.length, screenWidth, carouselTiming]);

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

  const isYouTubeVideo = (item: string) => {
    return videos.includes(item);
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
        {media.map((item: any, index: number) => (
          <View key={index} style={{ height, width }}>
            {isYouTubeVideo(item) ? (
              <YoutubeIframe height={height} width={width} videoId={item} />
            ) : (
              <Image
                source={typeof item === 'string' ? { uri: item } : item}
                style={{ height, width }}
                resizeMode={resizeMode}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {media.map((_: any, index: any) => (
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
