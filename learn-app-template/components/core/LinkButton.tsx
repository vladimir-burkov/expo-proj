import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { Children, PropsWithChildren } from 'react'
import { Href, Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

type LinkButtonProps = PropsWithChildren<{
  href: Href;
  arrowVisible?: boolean;
  size?: "large"| "medium" |"small",
  type?: "primary" | "secondary" | "confirm" | "reject"
}>;

const buttonSizes = {
  large: {
    paddingHorizontal: 20,
    paddingVertical: 12, 
    fontSize: 18,
    chevronSize: 16
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    chevronSize: 14
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    chevronSize: 12
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

const LinkButton = ({children, href, arrowVisible = false, size = 'medium', type="secondary" }: LinkButtonProps) => {

  const styles = StyleSheet.create({
    link: {
      minWidth: 300,
      padding: 4,
      flex: 1,
      flexBasis: 300,
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
      justifyContent: "space-between",
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
              <View>
                <Text style={{ fontSize: buttonSizes[size].fontSize, color: buttonColors[type].color, fontWeight: "bold" }}>
                  {children} 
                </Text>
              </View>
              {arrowVisible && 
                <View style={{ flexDirection: "row" }}>
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

