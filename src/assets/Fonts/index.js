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
          ? 18
          : paragrapgh
          ? 12
          : BigHeading
          ? 28
          : tiny
          ? 11
          : 14,
        ...style,
      }}
      onPress={onPress}>
      {txt}
    </Text>
  );
};
