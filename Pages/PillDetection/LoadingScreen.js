import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View, AccessibilityInfo } from "react-native";

export default function LoadingScreen() {

  return (
    <View style={styles.container} accessible={true} accessibilityLabel="사진을 촬영 하였습니다   로딩 중">
      <ActivityIndicator size="large" color="orange"
      />
      <Text style={styles.loadingText} >loding</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
});
