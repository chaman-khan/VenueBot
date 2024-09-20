import {StyleSheet, Text} from 'react-native';

export const MyText = ({
  style,
  txt,
  onPress,
  heading,
  paragrapgh,
  tiny,
  BigHeading,
  lines,
}) => {
  return (
    <Text
      numberOfLines={lines}
      style={{
        fontFamily: heading || BigHeading ? 'didot-bold' : 'didot',
        fontSize: heading
          ? 16
          : paragrapgh
          ? 11
          : BigHeading
          ? 22
          : tiny
          ? 10
          : 14,
        ...style,
      }}
      onPress={onPress}>
      {txt}
    </Text>
  );
};
