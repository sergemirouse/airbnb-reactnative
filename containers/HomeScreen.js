import { useNavigation } from "@react-navigation/core";
import {
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen({ userToken }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleOffers = async () => {
    setErrorMessage("");
    try {
      const response = await axios.get(
        " https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // if (isLoading === true) {
  //   return (
  //     <ActivityIndicator size="large" color="#EB5A62" hidesWhenStopped={true} />
  //   );
  // }

  const navigation = useNavigation();
  return (
    <View>
      <Text>Home sweet Home</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ScrollView>
              <Image source={item.photos.url} />
              <Text>{item.title}</Text>
              <Image source={item.user.account.photo.url} />
              <Text>{item.review}</Text>
            </ScrollView>
          );
        }}
      />
    </View>
  );
}
