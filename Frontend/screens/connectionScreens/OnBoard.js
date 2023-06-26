import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
} from "react-native";
import slide from "../../modules/slide";
import OnbordingItem from "../../components/OnbordingItem";
import Styles from "../../modules/importedStyle";
import { useSelector } from "react-redux";
import React, { useState } from "react";

export default function Carousel({ navigation }) {
  const loggedUser = useSelector((data) => {
    if (data.user) return data.user.value;
    else return null;
  });

  const [progress] = useState(new Animated.Value(0));

  function handleOnPress() {
    if (loggedUser.accesstoken !== null) {
      navigation.navigate("HomeTab");
    } else {
      navigation.navigate("Log");
    }
  }

  function handleScroll(event) {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const slideWidth = layoutMeasurement.width;
    const currentPosition = contentOffset.x;
    const pageIndex = Math.round(currentPosition / slideWidth);
    const totalPages = slide.length - 1;
    const currentProgress = pageIndex / totalPages;
    Animated.timing(progress, {
      toValue: currentProgress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <FlatList
        data={slide}
        renderItem={({ item }) => <OnbordingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
      />
      <TouchableOpacity onPress={() => handleOnPress()} style={Styles.button}>
        <Text style={Styles.textButton}>Passer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  progressContainer: {
    width: "95%",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginTop: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#F3A712",
    borderRadius: 5,
  },
});
