import React, { useRef, useState } from "react";
import { Animated, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const AnimateContainer = Animated.createAnimatedComponent(Container);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(250)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 250 : -250,
      useNativeDriver: true,
      duration: 1000,
    }).start(toggleUp);
  };
  const opacity = Y_POSITION.interpolate({
    inputRange: [-250, -100, 100, 250],
    outputRange: [1, 0.1, 0.1, 1],
  });
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-250, 250],
    outputRange: [100, 0],
  });
  return (
    <AnimateContainer accessibilityViewIsModal>
      <AnimatedPressable
        onPress={moveUp}
        style={{
          // flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          width: 200,
          height: 200,
          backgroundColor: "tomato",
          opacity,
          borderRadius,
          transform: [{ translateY: Y_POSITION }],
        }}
      >
        {/* <AnimatedBox
          style={{
            opacity,
            borderRadius,
            transform: [{ translateY: Y_POSITION }],
          }}
        /> */}
      </AnimatedPressable>
    </AnimateContainer>
  );
}
