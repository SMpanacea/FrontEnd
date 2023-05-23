import * as React from 'react';
import { useRef, useEffect } from 'react';
import { StyleSheet, View, findNodeHandle, AccessibilityInfo, InteractionManager } from 'react-native';
import { Camera } from 'react-native-pytorch-core';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function CameraScreen({ onCapture }) {
  const cameraRef = useRef(null);
  const ref = useRef(null);
  // useEffect(() => {
  //   const delay = 1500; // 3초
  //   setTimeout(() => {
  //     // 3초 후에 실행될 작업
  //     console.log('함수실행')
  //     // A11yModule.setA11yFocus(ref1)
  //     const reactTag = findNodeHandle(ref.current);

  //     if (reactTag) {
  //       console.log('함수실행3')
  //       AccessibilityInfo.setAccessibilityFocus(reactTag);
  //     }
  //   }, delay);
  // }, []);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {//모든 레이아웃과 애니메이션이 완료된 후에 코드 실행
      // 3초 후에 실행될 작업
      console.log('함수실행')
      // A11yModule.setA11yFocus(ref1)
      const reactTag = findNodeHandle(ref.current);

      if (reactTag) {
        console.log('함수실행3')
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    })
  }, []);
  function handleTakePicture() {
    const camera = cameraRef.current;
    if (camera != null) {
      camera.takePicture();
    }
  }
  return (

    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        onCapture={onCapture}
        style={styles.camera}
        hideCaptureButton={true}
        hideFlipButton={true}
        targetResolution={{ width: 1080, height: 1920 }}
      />
      <View style={styles.buttonContainer} ref={ref} accessible={true} accessibilityLabel="사진촬영버튼"  >
        <IconButton
          importantForAccessibility="no-hide-descendants"
          icon="camera-outline"
          iconColor="#fff"
          size={100}
          onPress={handleTakePicture}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 50,
  },
});

