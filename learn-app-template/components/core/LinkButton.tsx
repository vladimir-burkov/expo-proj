import { View, Text, Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import React, { Children, PropsWithChildren } from 'react'
import { Href, Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

export type LinkButtonProps = PropsWithChildren<{
  href: Href;
  buttonStyle: ButtonStyleType;
  chevronStyle?: ChevronStyleType;
}>;

export type ButtonStyleType = {
  plainButton: StyleProp<any>,
  plainButtonHovered: StyleProp<any>,
  plainButtonPressed: StyleProp<any>,
}

export type ChevronStyleType = {
  size: number,
  color: string,
}


const LinkButton = (props: LinkButtonProps) => {
  const {
    children, 
    href,
    buttonStyle, 
    chevronStyle, 
  } = props;

  return <>
  <Link
    style={{flex: 1}}
    href={href}
    asChild
  >
    <Pressable>
      {({ hovered, pressed }) => (
          <View style={{flex: 1}}>
            <View
                style={[
                  buttonStyle.plainButton,
                  hovered && buttonStyle.plainButtonHovered, 
                  pressed && buttonStyle.plainButtonPressed
                ]}
            >  
              {children} 
              {chevronStyle && 
                <View style={{ flexDirection: "row", paddingLeft: 16 }}>
                  <FontAwesome
                      name="chevron-right"
                      size={chevronStyle.size}
                      color={chevronStyle.color}
                  />
                </View>
              }
            </View>
          </View>
      )}
    </Pressable>
  </Link></>
}

export default LinkButton;

