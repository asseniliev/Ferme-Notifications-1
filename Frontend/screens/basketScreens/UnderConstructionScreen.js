import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UnderConstructionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color="#000000"
          onPress={() => navigation.navigate("Summary")}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>Under Construction</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    flex: 0.1,
    width: "90%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  bottomSection: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 26,
  },
});