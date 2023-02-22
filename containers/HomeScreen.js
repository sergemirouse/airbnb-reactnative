import { useNavigation } from "@react-navigation/core";
import {
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen({ userToken }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOffers = async () => {
      setErrorMessage("");
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleOffers();
  }, []);

  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  return isLoading ? (
    <ActivityIndicator size="large" color="#EB5A62" hidesWhenStopped={true} />
  ) : (
    <View maxHeight={height}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.announceImageContainer}>
                <Image
                  source={{ uri: item.photos[0].url }}
                  style={styles.announcePicture}
                />
              </View>
              <Text>{item.title}</Text>
              {/* <Image source={item.user.account.photo.url} /> */}
              <Text>{item.review}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  announceImageContainer: {
    height: "100%",
    width: "100%",
  },

  announcePicture: {
    width: "95%",
    height: "100%",
    resizeMode: "contain",
  },
});
