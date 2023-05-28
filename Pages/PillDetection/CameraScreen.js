import * as React from 'react';
import { useRef, useEffect } from 'react';
import { StyleSheet, View, findNodeHandle, AccessibilityInfo, InteractionManager } from 'react-native';
import { Camera } from 'react-native-pytorch-core';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function CameraScreen({ onCapture, errorState, isFront }) {
  const cameraRef = useRef(null);
  const ref = useRef(null);

  // useEffect(() => {
  //   InteractionManager.runAfterInteractions(() => {//모든 레이아웃과 애니메이션이 완료된 후에 코드 실행
  //     // 3초 후에 실행될 작업
  //     console.log('함수실행')
  //     // A11yModule.setA11yFocus(ref1)
  //     const reactTag = findNodeHandle(ref.current);

  //     if (reactTag) {
  //       console.log('함수실행3')
  //       AccessibilityInfo.setAccessibilityFocus(reactTag);
  //     }
  //   })
  // }, []);

  useEffect(() => {//알약 검출 여부에 따른 다른 talckback 안내 함수
    console.log('CameraScreen errorState', errorState)
    // 먼저 메시지를 발표합니다.
    if (errorState) {
      AccessibilityInfo.announceForAccessibility('알 약이 검출되지 않았습니다.');
      // 그런 다음 일정 시간 후에 접근성 포커스를 이동시킵니다.
      setTimeout(() => {
        const reactTag = findNodeHandle(ref.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }, 3000); // 3초 지연
    } else {
      InteractionManager.runAfterInteractions(() => {
        const reactTag = findNodeHandle(ref.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      });
    }
  }, []);

  const getAccessibilityLabel = () => {
    console.log('getAccessibilityLabel', isFront)
    if (isFront) {
      return '앞면 알약 사진 촬영버튼';
    } else {
      return '뒷면 알약 사진 촬영버튼';
    }
  };

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
      <View style={styles.buttonContainer} ref={ref} accessible={true} accessibilityLabel={getAccessibilityLabel()}  >
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

