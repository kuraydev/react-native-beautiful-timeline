import { ViewStyle, StyleSheet, Insets } from "react-native";

interface Style {
  container: ViewStyle;
  listStyle: ViewStyle;
  contentContainerStyle: ViewStyle;
  contentInset: Insets;
}

/**
 * Styles are built from the live window dimensions (via `useWindowDimensions`)
 * so the timeline reflows on rotation / split-view instead of capturing the
 * screen size once at module load.
 */
export const createTimelineStyles = (width: number) =>
  StyleSheet.create<Style>({
    container: {
      marginLeft: 16,
      marginRight: 16,
      flex: 1,
      backgroundColor: "#fdfdfd",
    },
    listStyle: {
      flex: 1,
      paddingTop: 16,
      width,
    },
    contentContainerStyle: {
      alignItems: "center",
      paddingBottom: 24,
    },
    contentInset: {
      bottom: 24,
    },
  });

export default createTimelineStyles;
