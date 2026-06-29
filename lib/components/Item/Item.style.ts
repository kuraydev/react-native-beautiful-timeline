import { ViewStyle, StyleSheet, Platform } from "react-native";

const isAndroid = Platform.OS === "android";

interface Style {
  container: ViewStyle;
  insideListContainer: ViewStyle;
}

export const createItemStyles = (width: number) =>
  StyleSheet.create<Style>({
    container: {
      width,
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: isAndroid ? 16 : 0,
    },
    insideListContainer: {
      marginTop: -24,
      flexDirection: "column",
    },
  });

export default createItemStyles;
