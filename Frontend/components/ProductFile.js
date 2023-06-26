import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function ProductFile(props) {
  return (
    <View style={styles.container}>
      <Text>Nom de l'article</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  }
});