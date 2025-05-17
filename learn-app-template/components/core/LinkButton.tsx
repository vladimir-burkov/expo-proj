import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { Children, PropsWithChildren } from 'react'
import { Href, Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

type LinkButtonProps = PropsWithChildren<{
  href: Href;
  arrowVisible?: boolean;
  size?: "large"| "medium" |"small";
  type?: "primary" | "secondary" | "confirm" | "reject";
  center?: boolean
}>;

const buttonSizes = {
  large: {
    paddingHorizontal: 20,
    paddingVertical: 20, 
    fontSize: 18,
    chevronSize: 16,
    maxHeight: 64
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    chevronSize: 14,
    maxHeight: 56
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    chevronSize: 12,
    maxHeight: 48
  }
}

const buttonColors = {
  primary: {
    bg: '#684bbc',
    color: 'white'
  },
  secondary: {
    bg: 'white',
    color: 'black'
  },
  confirm: {
    bg: 'green',
    color: 'white'
  },
  reject: {
    bg: 'red',
    color: 'white'
  },
}

const LinkButton = (props: LinkButtonProps) => {
  const {
    children, 
    href, 
    arrowVisible = false, 
    size = 'medium', 
    type = "secondary", 
    center = false 
  } = props;

  const styles = StyleSheet.create({
    link: {
      padding: 4,
      flex: 1,
      maxHeight: buttonSizes[size].maxHeight
    },
    pressArea: {
      backgroundColor: buttonColors[type].bg,
      borderRadius: 12,
      overflow: "hidden",
      flex: 1,
    },
    plainButton: {
      flex: 1,
      paddingHorizontal: buttonSizes[size].paddingHorizontal,
      paddingVertical: buttonSizes[size].paddingVertical,
      transitionDuration: "200ms",
      flexDirection: "row",
      justifyContent: center ? "center" : "space-between",
      alignItems: "center",
    }
  });

  
  return <>
  <Link
    style={styles.link}
    href={href}
    asChild
  >
    <Pressable>
      {({ hovered, pressed }) => (
          <View
              style={styles.pressArea}
          >
            <View
                style={[
                  styles.plainButton,
                  hovered && { backgroundColor: "rgba(0,0,0,0.1)" },
                  pressed && { backgroundColor: "rgba(0,0,0,0.2)" },
                ]}
            >  
              {children} 
              {arrowVisible && 
                <View style={{ flexDirection: "row", paddingLeft: 16 }}>
                  <FontAwesome
                      name="chevron-right"
                      size={buttonSizes[size].chevronSize}
                      color="#919497"
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

