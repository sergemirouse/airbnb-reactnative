import { useRoute } from "@react-navigation/core";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const { params } = useRoute();
  return (
    <View>
      <Text>user id : {params.userId}</Text>
    </View>
  );
}
