import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  shadowStyle: ViewStyle;
  titleTextStyle: TextStyle;
  subtitleTextStyle: TextStyle;
  dateTextStyle: TextStyle;
  cardContainer: ViewStyle;
  cardContainerGlue: ViewStyle;
  cardContainerShadowStyle: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    width: "85%",
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 3,
    borderRadius: 322,
    alignSelf: "baseline",
    flexDirection: "column",
  },
  cardContainerGlue: {
    width: "100%",
    paddingLeft: 16,
  },
  titleTextStyle: {
    color: "#556084",
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitleTextStyle: {
    color: "#8c93ab",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },
  dateTextStyle: {
    color: "#ccc",
    fontSize: 10,
    marginLeft: 32,
    marginTop: 0,
  },
  shadowStyle: {
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowRadius: 7,
    shadowOpacity: 0.09,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  cardContainer: {
    marginTop: -5,
    paddingTop: 12,
    marginLeft: 24,
    borderRadius: 12,
    paddingBottom: 6,
    flexDirection: "row",
  },
  cardContainerShadowStyle: {
    paddingBottom: 12,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowRadius: 7,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
});
