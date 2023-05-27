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

  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  const test_data = [
    {
      "numOfRows": 1,
      "pageNo": 1,
      "totalCount": 0,
      'items': [{'entpName': '동화약품(주)', 'itemName': '활명수', 'itemSeq': '195700020', 'efcyQesitm': '<p>이 약은 식욕감퇴(식욕부진), 위부팽만감, 소화불량, 과식, 체함, 구역, 구토에 사용합니다.</p>\n', 'useMethodQesitm': '<p>만 15세 이상 및 성인은 1회 1병(75 mL), 만 11세이상~만 15세미만은 1회 <sup>2</sup>/<sub>3</sub>병(50 mL), \
만 8세 이상~만 11세 미만은 1회 <sup>1</sup>/<sub>2</sub>병(37.5 mL), 만 5세 이상~만 8세 미만은 1회 <sup>1</sup>/<sub>3</sub>병(25 mL), 만 3세 이상~만 5세 미만은 1회 <sup>1</sup>/<sub>4</sub>병(18.75 mL), 만 1세 이상~만 3세 미\
만은 1회 <sup>1</sup>/<sub>5</sub>병(15 mL),\xa01일 3회 식후에 복용합니다. 복용간격은 4시간 이상으로 합니다.</p>\n', 'atpnWarnQesitm': 'None', 'atpnQesitm': '<p>만 3개월 미만의 젖먹이는 이 약을 복용하지 마십시오.</p>\n\n<p>이  \
약을 복용하기 전에\xa0만 1세 미만의 젖먹이, 임부 또는 임신하고 있을 가능성이 있는 여성, 카라멜에 과민증 환자 또는 경험자, 나트륨 제한 식이를 하는 사람은\xa0의사 또는 약사와 상의하십시오.</p>\n\n<p>정해진 용법과 용량을 잘 지키\
십시오.</p>\n\n<p>어린이에게 투여할 경우 보호자의 지도 감독하에 투여하십시오.</p>\n\n<p>1개월 정도\xa0복용하여도 증상의 개선이 없을 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.</p>\n', 'intrcQesitm': 'None', 'seQesitm': 'None', 'depositMethodQesitm': '<p>습기와 빛을 피해 실온에서 보관하십시오.</p>\n\n<p>어린이의 손이 닿지 않는 곳에 보관하십시오.</p>\n', 'openDe': '2021-01-29 00:00:00', 'updateDe': '2023-01-25', 'itemImage': 'None'}],
    },
    {
      "numOfRows": 1,
      "pageNo": 1,
      "totalCount": 0,
      'items': [{'entpName': '동화약품(주)', 'itemName': '활명수', 'itemSeq': '195700020', 'efcyQesitm': '<p>이 약은 식욕감퇴(식욕부진), 위부팽만감, 소화불량, 과식, 체함, 구역, 구토에 사용합니다.</p>\n', 'useMethodQesitm': '<p>만 15세 이상 및 성인은 1회 1병(75 mL), 만 11세이상~만 15세미만은 1회 <sup>2</sup>/<sub>3</sub>병(50 mL), \
만 8세 이상~만 11세 미만은 1회 <sup>1</sup>/<sub>2</sub>병(37.5 mL), 만 5세 이상~만 8세 미만은 1회 <sup>1</sup>/<sub>3</sub>병(25 mL), 만 3세 이상~만 5세 미만은 1회 <sup>1</sup>/<sub>4</sub>병(18.75 mL), 만 1세 이상~만 3세 미\
만은 1회 <sup>1</sup>/<sub>5</sub>병(15 mL),\xa01일 3회 식후에 복용합니다. 복용간격은 4시간 이상으로 합니다.</p>\n', 'atpnWarnQesitm': 'None', 'atpnQesitm': '<p>만 3개월 미만의 젖먹이는 이 약을 복용하지 마십시오.</p>\n\n<p>이  \
약을 복용하기 전에\xa0만 1세 미만의 젖먹이, 임부 또는 임신하고 있을 가능성이 있는 여성, 카라멜에 과민증 환자 또는 경험자, 나트륨 제한 식이를 하는 사람은\xa0의사 또는 약사와 상의하십시오.</p>\n\n<p>정해진 용법과 용량을 잘 지키\
십시오.</p>\n\n<p>어린이에게 투여할 경우 보호자의 지도 감독하에 투여하십시오.</p>\n\n<p>1개월 정도\xa0복용하여도 증상의 개선이 없을 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.</p>\n', 'intrcQesitm': 'None', 'seQesitm': 'None', 'depositMethodQesitm': '<p>습기와 빛을 피해 실온에서 보관하십시오.</p>\n\n<p>어린이의 손이 닿지 않는 곳에 보관하십시오.</p>\n', 'openDe': '2021-01-29 00:00:00', 'updateDe': '2023-01-25', 'itemImage': 'None'}],
    },
    {
      "numOfRows": 1,
      "pageNo": 1,
      "totalCount": 0,
      'items': [{'entpName': '동화약품(주)', 'itemName': '활명수', 'itemSeq': '195700020', 'efcyQesitm': '<p>이 약은 식욕감퇴(식욕부진), 위부팽만감, 소화불량, 과식, 체함, 구역, 구토에 사용합니다.</p>\n', 'useMethodQesitm': '<p>만 15세 이상 및 성인은 1회 1병(75 mL), 만 11세이상~만 15세미만은 1회 <sup>2</sup>/<sub>3</sub>병(50 mL), \
만 8세 이상~만 11세 미만은 1회 <sup>1</sup>/<sub>2</sub>병(37.5 mL), 만 5세 이상~만 8세 미만은 1회 <sup>1</sup>/<sub>3</sub>병(25 mL), 만 3세 이상~만 5세 미만은 1회 <sup>1</sup>/<sub>4</sub>병(18.75 mL), 만 1세 이상~만 3세 미\
만은 1회 <sup>1</sup>/<sub>5</sub>병(15 mL),\xa01일 3회 식후에 복용합니다. 복용간격은 4시간 이상으로 합니다.</p>\n', 'atpnWarnQesitm': 'None', 'atpnQesitm': '<p>만 3개월 미만의 젖먹이는 이 약을 복용하지 마십시오.</p>\n\n<p>이  \
약을 복용하기 전에\xa0만 1세 미만의 젖먹이, 임부 또는 임신하고 있을 가능성이 있는 여성, 카라멜에 과민증 환자 또는 경험자, 나트륨 제한 식이를 하는 사람은\xa0의사 또는 약사와 상의하십시오.</p>\n\n<p>정해진 용법과 용량을 잘 지키\
십시오.</p>\n\n<p>어린이에게 투여할 경우 보호자의 지도 감독하에 투여하십시오.</p>\n\n<p>1개월 정도\xa0복용하여도 증상의 개선이 없을 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.</p>\n', 'intrcQesitm': 'None', 'seQesitm': 'None', 'depositMethodQesitm': '<p>습기와 빛을 피해 실온에서 보관하십시오.</p>\n\n<p>어린이의 손이 닿지 않는 곳에 보관하십시오.</p>\n', 'openDe': '2021-01-29 00:00:00', 'updateDe': '2023-01-25', 'itemImage': 'None'}],
    },
    {
      "numOfRows": 1,
      "pageNo": 1,
      "totalCount": 0,
      'items': [{'entpName': '동화약품(주)', 'itemName': '활명수', 'itemSeq': '195700020', 'efcyQesitm': '<p>이 약은 식욕감퇴(식욕부진), 위부팽만감, 소화불량, 과식, 체함, 구역, 구토에 사용합니다.</p>\n', 'useMethodQesitm': '<p>만 15세 이상 및 성인은 1회 1병(75 mL), 만 11세이상~만 15세미만은 1회 <sup>2</sup>/<sub>3</sub>병(50 mL), \
만 8세 이상~만 11세 미만은 1회 <sup>1</sup>/<sub>2</sub>병(37.5 mL), 만 5세 이상~만 8세 미만은 1회 <sup>1</sup>/<sub>3</sub>병(25 mL), 만 3세 이상~만 5세 미만은 1회 <sup>1</sup>/<sub>4</sub>병(18.75 mL), 만 1세 이상~만 3세 미\
만은 1회 <sup>1</sup>/<sub>5</sub>병(15 mL),\xa01일 3회 식후에 복용합니다. 복용간격은 4시간 이상으로 합니다.</p>\n', 'atpnWarnQesitm': 'None', 'atpnQesitm': '<p>만 3개월 미만의 젖먹이는 이 약을 복용하지 마십시오.</p>\n\n<p>이  \
약을 복용하기 전에\xa0만 1세 미만의 젖먹이, 임부 또는 임신하고 있을 가능성이 있는 여성, 카라멜에 과민증 환자 또는 경험자, 나트륨 제한 식이를 하는 사람은\xa0의사 또는 약사와 상의하십시오.</p>\n\n<p>정해진 용법과 용량을 잘 지키\
십시오.</p>\n\n<p>어린이에게 투여할 경우 보호자의 지도 감독하에 투여하십시오.</p>\n\n<p>1개월 정도\xa0복용하여도 증상의 개선이 없을 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.</p>\n', 'intrcQesitm': 'None', 'seQesitm': 'None', 'depositMethodQesitm': '<p>습기와 빛을 피해 실온에서 보관하십시오.</p>\n\n<p>어린이의 손이 닿지 않는 곳에 보관하십시오.</p>\n', 'openDe': '2021-01-29 00:00:00', 'updateDe': '2023-01-25', 'itemImage': 'None'}],
    },
    {
      "numOfRows": 1,
      "pageNo": 1,
      "totalCount": 0,
      'items': [{'entpName': '동화약품(주)', 'itemName': '활명수', 'itemSeq': '195700020', 'efcyQesitm': '<p>이 약은 식욕감퇴(식욕부진), 위부팽만감, 소화불량, 과식, 체함, 구역, 구토에 사용합니다.</p>\n', 'useMethodQesitm': '<p>만 15세 이상 및 성인은 1회 1병(75 mL), 만 11세이상~만 15세미만은 1회 <sup>2</sup>/<sub>3</sub>병(50 mL), \
만 8세 이상~만 11세 미만은 1회 <sup>1</sup>/<sub>2</sub>병(37.5 mL), 만 5세 이상~만 8세 미만은 1회 <sup>1</sup>/<sub>3</sub>병(25 mL), 만 3세 이상~만 5세 미만은 1회 <sup>1</sup>/<sub>4</sub>병(18.75 mL), 만 1세 이상~만 3세 미\
만은 1회 <sup>1</sup>/<sub>5</sub>병(15 mL),\xa01일 3회 식후에 복용합니다. 복용간격은 4시간 이상으로 합니다.</p>\n', 'atpnWarnQesitm': 'None', 'atpnQesitm': '<p>만 3개월 미만의 젖먹이는 이 약을 복용하지 마십시오.</p>\n\n<p>이  \
약을 복용하기 전에\xa0만 1세 미만의 젖먹이, 임부 또는 임신하고 있을 가능성이 있는 여성, 카라멜에 과민증 환자 또는 경험자, 나트륨 제한 식이를 하는 사람은\xa0의사 또는 약사와 상의하십시오.</p>\n\n<p>정해진 용법과 용량을 잘 지키\
십시오.</p>\n\n<p>어린이에게 투여할 경우 보호자의 지도 감독하에 투여하십시오.</p>\n\n<p>1개월 정도\xa0복용하여도 증상의 개선이 없을 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.</p>\n', 'intrcQesitm': 'None', 'seQesitm': 'None', 'depositMethodQesitm': '<p>습기와 빛을 피해 실온에서 보관하십시오.</p>\n\n<p>어린이의 손이 닿지 않는 곳에 보관하십시오.</p>\n', 'openDe': '2021-01-29 00:00:00', 'updateDe': '2023-01-25', 'itemImage': 'None'}],
    },
  ]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
              <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
          </TouchableOpacity>
      ),
      headerTitle: "알약 인식",
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

    console.log('imgArray.length', imgArray.length)
  }, [image, setScreenState]);

  //이미지 추가 후 두번쨰 이미지 촬영
  const handleNextImg = useCallback(async () => {
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
          alert('전송 완료')
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
    console.log("send!!");
    const frontValue = { front: imgArray[0], back: imgArray[1] };
    fetch(`${IP}/medicine/image`, {  // 여기에 보내고자 하는 URL을 넣습니다.
      method: 'POST',                   // 메서드를 'POST'로 설정합니다.
      headers: {
        'Content-Type': 'application/json',  // JSON 형태로 데이터를 보낼 것이기 때문에 'Content-Type'을 'application/json'으로 설정합니다.
      },
      body: JSON.stringify(frontValue),
    })
      .then((response) => {
        // console.log("여긴 안들어와?")
        // console.log('전송 완료2', response);
        // console.log('전송 완료', response);
        // console.log(response);
        // console.log("이게 바로나오면 위 출력 무시...")
        // response.json();
        return response.json();  // Promise 반환
      })  // 서버에서 돌아온 응답을 JSON 형태로 파싱합니다.
      .then((json) => {
        console.log("여기도 안들어와?")
        navigation.navigate('Main', { json: test_data })
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
    } catch (err) {

      // 객체가 검줄 되지 않거나 오류가 발생한 경우 새로운 사진을 찍기 위해 카메라 화면으로 돌아갑니다
      console.log(err);
      handleReset();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {screenState === ScreenStates.CAMERA && (
        <CameraScreen onCapture={handleImage} />
      )}
      {screenState === ScreenStates.LOADING && <LoadingScreen />}
      {screenState === ScreenStates.RESULTS && (
        <ResultsScreen
          image={image}
          boundingBoxes={boundingBoxes}
          onReset={handleReset}
          onNextImg={handleNextImg}
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

