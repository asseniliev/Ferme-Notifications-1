import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const slides = [
    {
      id: 1,
      image: require("../assets/fla4.jpg"),
      text: "Carte et marchés",
      style: styles.slide1,
      textStyle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
      screenName: "Screen1"
    },
    {
      id: 2,
      image: require("../assets/fla5.jpg"),
      text: "Le Blog",
      style: styles.slide2,
      textStyle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
      screenName: "Screen2"
    },
    {
      id: 3,
      image: require("../assets/fla2.jpg"),
      text: "Mon engagement",
      style: styles.slide3,
      textStyle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
      screenName: "PresentationScreen"
    },
  ];

  const handleScroll = (event) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideWidth;
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.slidesContainer}
        scrollEventThrottle={200}
        initialPage={1}
      >
        {slides.map((slide) => (
          <TouchableOpacity
          key={slide.id}
          style={[styles.slide, slide.style]}
          onPress={() => navigation.navigate(slide.screenName)} // navigation vers l'écran spécifié
          activeOpacity={1}
        >
          {slide.image && (
            <Image source={slide.image} style={styles.slideImage} />
          )}
          <Text style={[styles.slideText, slide.textStyle]}>{slide.text}</Text>
        </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.indicatorsContainer}>
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 295,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  slidesContainer: {
    width: "300%",
    height: "100%",
  },
  slide: {
    width: "33.333333%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  slideImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  slideText: {
    position: "absolute",
    top: 45,
  },
  indicatorsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#3A7D44",
  padding: 2,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "#fff",
  },
});

export default Carousel;
