import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from '@expo/vector-icons';

export default function Presentation({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title1Container}>
      <AntDesign name="caretleft" size={24} color="#3A7D44" />
        <Text
          style={styles.title1}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          {" "}ferme de {"\n"} mereynal
        </Text>
        </View>
        <Text style={styles.title2}>
          mon exploitation{"\n"}
          {"            "}permacole
        </Text>
      </View>
      <ScrollView style={styles.textContainer}>
        <Image source={require("../../assets/fla2.jpg")} style={styles.image} />
        <Text style={styles.titre}>L’exploitation :</Text>
        <Text style={styles.paragraphe}>
          {" "}
          Lorem ipsum dolor sit amet. Ea eligendi incidunt est facere velit aut
          mollitia labore est libero ipsam At doloremque asperiores ad animi
          molestias? Ut maiores maiores ad iure cupiditate ut quibusdam dolore
          in consequatur quam nam voluptas debitis ut nostrum cupiditate. Quo
          itaque corrupti ut nulla quas est deleniti labore qui placeat
          reiciendis est consectetur officia.
          {"\n"}
          {"\n"}
          Aut aperiam quam in libero fugit hic excepturi optio qui eligendi
          corrupti. Eum aperiam voluptatem ea itaque enim in molestiae aliquid
          in error dolores ea cupiditate autem sit internos optio. Id beatae
          harum vel deleniti harum ex omnis itaque.
          {"\n"}
          {"\n"}
          Et animi aperiam 33 autem aperiam et laboriosam nisi sed quia porro id
          minima sequi est doloremque repudiandae rem sint inventore. Eum
          accusantium molestias et obcaecati iusto aut amet exercitationem.
        </Text>
        <Text style={styles.titre}>Mes engagements :</Text>
        <Text style={styles.paragraphe}>
          {" "}
          Lorem ipsum dolor sit amet. Ea eligendi incidunt est facere velit aut
          mollitia labore est libero ipsam At doloremque asperiores ad animi
          molestias? Ut maiores maiores ad iure cupiditate ut quibusdam dolore
          in consequatur quam nam voluptas debitis ut nostrum cupiditate. Quo
          itaque corrupti ut nulla quas est deleniti labore qui placeat
          reiciendis est consectetur officia.
          {"\n"}
          {"\n"}
          Aut aperiam quam in libero fugit hic excepturi optio qui eligendi
          corrupti. Eum aperiam voluptatem ea itaque enim in molestiae aliquid
          in error dolores ea cupiditate autem sit internos optio. Id beatae
          harum vel deleniti harum ex omnis itaque.
          {"\n"}
          {"\n"}
          Et animi aperiam 33 autem aperiam et laboriosam nisi sed quia porro id
          minima sequi est doloremque repudiandae rem sint inventore. Eum
          accusantium molestias et obcaecati iusto aut amet exercitationem.
        </Text>
        <Text style={styles.titre}>Mon histoire : </Text>
        <Text style={styles.paragraphe}>
          {" "}
          Lorem ipsum dolor sit amet. Ea eligendi incidunt est facere velit aut
          mollitia labore est libero ipsam At doloremque asperiores ad animi
          molestias? Ut maiores maiores ad iure cupiditate ut quibusdam dolore
          in consequatur quam nam voluptas debitis ut nostrum cupiditate. Quo
          itaque corrupti ut nulla quas est deleniti labore qui placeat
          reiciendis est consectetur officia.
          {"\n"}
          {"\n"}
          Aut aperiam quam in libero fugit hic excepturi optio qui eligendi
          corrupti. Eum aperiam voluptatem ea itaque enim in molestiae aliquid
          in error dolores ea cupiditate autem sit internos optio. Id beatae
          harum vel deleniti harum ex omnis itaque.
          {"\n"}
          {"\n"}
          Et animi aperiam 33 autem aperiam et laboriosam nisi sed quia porro id
          minima sequi est doloremque repudiandae rem sint inventore. Eum
          accusantium molestias et obcaecati iusto aut amet exercitationem.
        </Text>
        <View style={{ height: 150 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  title1Container:{
    flexDirection: "row", 
    alignItems: "center",
  },
  title1: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    width: "100%",
    padding: 30,

  },
  titre: {
    fontFamily: "BelweBold",
    fontSize: 30,
    color: "#F3A712",
    marginVertical: 15,
  },
  paragraphe: {
    fontSize: 18,
    color: "#501B16",
  },
});
