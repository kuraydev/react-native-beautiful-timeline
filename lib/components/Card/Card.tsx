import * as React from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import moment from "moment";
/**
 * ? Local Imports
 */
import styles from "./Card.style";
import { ITimelineData } from "../../models";

interface CardProps {
  data: ITimelineData;
  isCard?: boolean;
  dateFormat?: string;
  style?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  subtitleTextStyle?: StyleProp<TextStyle>;
  dateTextStyle?: StyleProp<TextStyle>;
}

const Card: React.FC<CardProps> = ({
  isCard = true,
  data,
  titleTextStyle,
  subtitleTextStyle,
  dateTextStyle,
  dateFormat = "DD ddd, HH:mm",
}) => {
  const { title, subtitle, date } = data;
  return (
    <View
      style={[
        styles.container,
        styles.shadowStyle,
        isCard && {
          backgroundColor: "transparent",
        },
      ]}
    >
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={`${title}. ${subtitle}`}
        style={[
          styles.cardContainer,
          isCard && styles.cardContainerShadowStyle,
        ]}
      >
        <View style={styles.cardContainerGlue}>
          <Text
            numberOfLines={1}
            style={[styles.titleTextStyle, titleTextStyle]}
          >
            {title}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.subtitleTextStyle, subtitleTextStyle]}
          >
            {subtitle}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.dateTextStyle,
          isCard && { marginTop: 8 },
          dateTextStyle,
        ]}
      >
        {moment(date).format(dateFormat)}
      </Text>
    </View>
  );
};

export default React.memo(Card);
