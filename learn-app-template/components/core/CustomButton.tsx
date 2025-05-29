import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or any icon library you're using

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  closable?: boolean;
}
const CustomButton = (props: CustomButtonProps) => {
  const {
    title,
    onPress,
    backgroundColor = '#007bff',
    textColor = '#ffffff',
    borderRadius = 12,
    iconName,
    iconColor = '#ffffff',
    iconSize = 20,
    style,
    textStyle,
    disabled = false,
    closable = false
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#ccc' : backgroundColor,
          borderRadius,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
        {closable && (
          <Ionicons
            name={'close'}
            size={12}
            color={iconColor}
            style={{ marginLeft: 4 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    bottom: 2
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomButton;
