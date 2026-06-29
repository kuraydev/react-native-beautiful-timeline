import * as React from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";
import moment from "moment";
import Dash from "react-native-dash-2";
/**
 * ? Local Imports
 */
import styles, { _dashStyle } from "./PointLine.style";
import Point from "./components/Point";

interface PointLineProps {
  date: number;
  length: number;
  isLastMember: boolean;
  dayTextStyle?: StyleProp<TextStyle>;
  monthTextStyle?: StyleProp<TextStyle>;
}

const PointLine: React.FC<PointLineProps> = ({
  date,
  isLastMember,
  dayTextStyle,
  length,
  monthTextStyle,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerGlue}>
        <Text style={[styles.dayTextStyle, dayTextStyle]}>
          {moment(date).format("DD")}
        </Text>
        <Text style={[styles.monthTextStyle, monthTextStyle]}>
          {moment(date).format("ddd").toUpperCase()}
        </Text>
      </View>
      <View style={styles.dividerStyle}>
        {!isLastMember && (
          <Dash
            dashGap={7}
            dashColor="#e3e3e3"
            style={_dashStyle(length)}
            dashLength={length}
            dashThickness={1}
            {...rest}
          />
        )}
        <Point {...rest} />
      </View>
    </View>
  );
};

export default React.memo(PointLine);
