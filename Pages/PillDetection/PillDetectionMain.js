import { useCallback, useState, useEffect, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  AccessibilityInfo,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  ImageUtil
} from 'react-native-pytorch-core';
import detectObjects from './ObjectDetector';
import CameraScreen from './CameraScreen';
import LoadingScreen from './LoadingScreen';
import ResultsScreen from './ResultsScreen';
//서버
import ServerPort from '../../Components/ServerPort';
import RNFetchBlob from 'react-native-fetch-blob';


const IP = ServerPort();
// 화면 상태 정의
const ScreenStates = {
  CAMERA: 0,
  LOADING: 1,
  RESULTS: 2,
};
let imgArray = [];
export default function PillDetectionMain({ navigation }) {
  const [image, setImage] = useState(null);
  const [boundingBoxes, setBoundingBoxes] = useState(null);
  const [screenState, setScreenState] = useState(ScreenStates.CAMERA);
  const [errorState, setErrorState] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [checkLastCapture, setCheckLastCapture] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
          <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
        </TouchableOpacity>
      ),
      headerTitle: "알약 인식",
      headerStyle: {
        elevation: 10, // 안드로이드 그림자 효과
        shadowOpacity: 0.5, // iOS 그림자 효과
        shadowColor: 'black', // 그림자 색상 설정
        shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
        shadowRadius: 4, // 그림자 반경 설정
      },
    });
  }, [])

  useEffect(() => {
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener('screenReaderChanged', isScreenReaderEnabled => {
      setScreenReaderEnabled(isScreenReaderEnabled);
    },);
    AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => { setScreenReaderEnabled(isScreenReaderEnabled) });
    return () => {
      screenReaderChangedSubscription.remove();
    };
  }, []);


  //imgArray = [];//이미지 base64 데이터 배열
  // 리셋 핸들러 함수
  const handleReset = useCallback(async () => {
    setScreenState(ScreenStates.CAMERA);
    if (image != null) {
      await image.release();
    }
    setImage(null);
    setBoundingBoxes(null);
    setErrorState(false);
    console.log('imgArray.length', imgArray.length)
  }, [image, setScreenState]);

  //이미지 추가 후 두번쨰 이미지 촬영
  const handleNextImg = useCallback(async () => {
    setIsFront(false);
    setCheckLastCapture(true);
    //이미지 객체를 file로 저장
    const imagePath = await ImageUtil.toFile(image);
    console.log('imagePath', imagePath);
    // 이미지 파일을 base64로 읽기
    RNFetchBlob.fs.readFile(imagePath, 'base64')
      .then((base64Data) => {
        //console.log('Base64 encoded image:', base64Data);
        imgArray.push(base64Data);
        console.log('imgArray.length', imgArray.length)
        if (imgArray.length === 2) {  //photos 배열의 길이가 2이면
          //alert('전송 완료')
          sendImageToServer(); // 두 개의 사진 데이터를 전달
        }
      })
      .catch((error) => {
        console.log('Error reading image file:', error);
      });
    setScreenState(ScreenStates.CAMERA);
    if (image != null) {
      await image.release();
    }
    setImage(null);
    setBoundingBoxes(null);
  }, [image, setScreenState]);

  // 사진 서버에 보내기
  const sendImageToServer = async () => {
    setScreenState(ScreenStates.LOADING);
    console.log("send!!");
    const frontValue = { front: imgArray[0], back: imgArray[1] };
    fetch(`${IP}/medicine/imageFix`, {  // 여기에 보내고자 하는 URL을 넣습니다.
      method: 'POST',                   // 메서드를 'POST'로 설정합니다.
      headers: {
        'Content-Type': 'application/json',  // JSON 형태로 데이터를 보낼 것이기 때문에 'Content-Type'을 'application/json'으로 설정합니다.
      },
      body: JSON.stringify(frontValue),
    })
      .then((response) => {
        
        return response.json();  // Promise 반환
      })  // 서버에서 돌아온 응답을 JSON 형태로 파싱합니다.
      .then((json) => {
        console.log("여기도 안들어와?")
        navigation.navigate('Main', { json: json })
        console.log(json)
      })  // 파싱된 결과를 콘솔에 출력합니다.
      .catch((error) => console.error(error));  // 에러가 발생하면 콘솔에 에러를 출력합니다.
    imgArray = [];
  };

  // 카메라에서 캡처 이벤트를 처리하는 함수
  async function handleImage(capturedImage) {

    setImage(capturedImage);
    // YOLOv5 모델을 통해 이미지 처리 및 결과 이미지 그리기를 기다립니다
    setScreenState(ScreenStates.LOADING);
    try {
      const newBoxes = await detectObjects(capturedImage);
      if (newBoxes.length === 0) {//검출된 객체가 없음
        throw new Error("array is empty");
      }
      setBoundingBoxes(newBoxes);
      // 결과 화면으로 전환하여 감지된 객체를 표시합니다
      setScreenState(ScreenStates.RESULTS);
      setErrorState(false);
    } catch (err) {
      // 객체가 검줄 되지 않거나 오류가 발생한 경우 새로운 사진을 찍기 위해 카메라 화면으로 돌아갑니다
      console.log(err);
      setErrorState(true)
      handleReset();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {screenState === ScreenStates.CAMERA && (
        <CameraScreen onCapture={handleImage} errorState={errorState} isFront={isFront} />
      )}
      {screenState === ScreenStates.LOADING && <LoadingScreen />}
      {screenState === ScreenStates.RESULTS && (
        <ResultsScreen
          image={image}
          boundingBoxes={boundingBoxes}
          onReset={handleReset}
          onNextImg={handleNextImg}
          checkLastCapture={checkLastCapture}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

