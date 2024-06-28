import { StyleSheet, Text, View } from "react-native";

import Navigation from "./src/navigation/stackNavigation/index";
import BottomTabNavigation from "./src/navigation/bottomNavigation/index";

export default function App() {
  return (
    <>
      {/* <Navigation /> */}
      <BottomTabNavigation/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
