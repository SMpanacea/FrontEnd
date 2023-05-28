import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  AccessibilityInfo,
  findNodeHandle,
  InteractionManager
} from "react-native";
import { Canvas } from "react-native-pytorch-core";

const objectColors = [
  "#00ff00"
];

// iOS와 Android에서의 텍스트 위치를 조절하기 위한 상수입니다.
const textBaselineAdjustment = Platform.OS == "ios" ? 7 : 4;

export default function ResultsScreen({ image, boundingBoxes, onReset, onNextImg }) {
  const ref = useRef(null);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // A11yModule.setA11yFocus(ref1)
      const reactTag = findNodeHandle(ref.current);
      if (reactTag) {
        console.log("findNodeHandle")
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    })
  }, []);
  const [ctx, setCtx] = useState(null);  // canvas의 컨텍스트를 저장할 state입니다.
  const [layout, setLayout] = useState(null);  // canvas의 레이아웃 정보를 저장할 state입니다.

  useEffect(
    () => {
      // 컨텍스트, 레이아웃, 이미지가 모두 준비된 상태라면 실행합니다.
      if (ctx != null && layout != null && image != null) {
        ctx.clearRect(0, 0, layout.width, layout.height);  // canvas를 비웁니다.

        // 이미지를 화면에 맞게 크기를 조절합니다.
        const imageWidth = image.getWidth();
        const imageHeight = image.getHeight();
        const scale = Math.max(
          layout.width / imageWidth,
          layout.height / imageHeight
        );
        const displayWidth = imageWidth * scale;
        const displayHeight = imageHeight * scale;
        const offsetX = (layout.width - displayWidth) / 2;
        const offsetY = (layout.height - displayHeight) / 2;
        ctx.drawImage(image, offsetX, offsetY, displayWidth, displayHeight);

        // boundingBoxes가 제공되면, bounding box와 레이블을 그립니다.
        if (boundingBoxes) {
          ctx.font = `13px monospace`;  // 텍스트의 폰트를 설정합니다.
          ctx.fillStyle = "#000";  // 채우기 색을 설정합니다.
          ctx.textAlign = "left";  // 텍스트 정렬을 설정합니다.

          // 각 boundingBox에 대해 실행합니다.
          boundingBoxes.forEach((boundingBox, index) => {
            const { objectClass, bounds } = boundingBox;
            const x = offsetX + bounds[0] * scale;
            const y = offsetY + bounds[1] * scale;
            const w = bounds[2] * scale;
            const h = bounds[3] * scale;

            // boxColor를 설정합니다.
            //const boxColor = objectColors[index % objectColors.length];
            const boxColor = objectColors[0];
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(x - 10, y - 10, w + 20, h + 20);
            ctx.stroke();

            // 텍스트 배경을 그립니다.
            const textHorizontalPadding = 4;
            const textWidth =
              objectClass.length * 6 + 2 * textHorizontalPadding;
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 25;
            ctx.lineCap = "round";
            ctx.beginPath();
            const textStartX = x + w / 2 - textWidth / 2;
            ctx.moveTo(textStartX, y - 20);
            ctx

            ctx.lineTo(textStartX + textWidth, y - 20);
            ctx.stroke();

            ctx.fillStyle = "#fff";
            ctx.fillText(objectClass, textStartX, y + textBaselineAdjustment - 20);
          });
          ctx.invalidate();
        }
      }
    },
    [ctx, layout, image, boundingBoxes] // dependencies for useCallback
  );
  return (
    <View style={styles.container}>
      <Canvas
        style={StyleSheet.absoluteFill}
        onLayout={(event) => {
          setLayout(event.nativeEvent.layout);
        }}
        onContext2D={setCtx}
      />
      <View style={styles.pictureContainer} ref={ref} accessibilityRole="button" accessible={true} accessibilityLabel="알 약이 감지되었습니다" accessibilityHint="다음 사진 촬영"  >
        <TouchableOpacity onPress={onNextImg} style={styles.continueButton} importantForAccessibility="no-hide-descendants">
          <Text style={styles.buttonLabel} >Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer} accessibilityRole="button" accessible={true} accessibilityLabel="다시 촬영">
        <TouchableOpacity onPress={onReset} style={styles.resetButton} importantForAccessibility="no-hide-descendants">
          <Text style={styles.buttonLabel} >Try again picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pictureContainer: {
    position: "absolute",
    width: "100%",
    bottom: 100,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 20,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#00FF80",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  resetButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  buttonLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
