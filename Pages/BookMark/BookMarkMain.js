// 약 즐겨찾기 후 보이는 화면 -> 약 정보 보려면 MedicineDetail.js로 넘어가야 돼!!

import axios from 'axios';
import React from 'react';
import {StyleSheet,  View, ScrollView, TouchableOpacity, AccessibilityInfo, Image } from 'react-native';
import {TouchableRipple} from 'react-native-paper';

// 화면 비율
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');
// navigation
import 'react-native-gesture-handler';

// 약목록 보여주는 component
import Card from '../../Components/Card';

// 로딩
import Loading from '../../Components/Loading';

//토큰
import AsyncStorage from '@react-native-async-storage/async-storage';


// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

function BookMarkMain({navigation}) {
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가
  const [bookmarkmedicine, setBookmarkmedicine] = React.useState([]);//즐겨찾기한 약 정보
  const [medicinedata, setMedicinedata] = React.useState([]);//약 정보
  const [tokens, setTokens] = React.useState("");

  const [bookmark, setBookmark] = React.useState([]);//bookmark 리스트 있는지 확인

  React.useLayoutEffect(() => {
    AccessibilityInfo.announceForAccessibility();
    navigation.setOptions({
      headerLeft: () => (
        <TouchableRipple onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
          <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
        </TouchableRipple>
      ),
      headerTitle: "즐겨찾기 목록",
      headerStyle: {
        elevation: 10, // 안드로이드 그림자 효과
        shadowOpacity: 0.5, // iOS 그림자 효과
        shadowColor: 'black', // 그림자 색상 설정
        shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
        shadowRadius: 4, // 그림자 반경 설정
      },
    });
  }, [])

  React.useEffect(()=> {
    console.log("북마크 바뀜")
    BookmarkListall()
  },[bookmark])

  const BookmarkListall = async () => {
    const getToken = await AsyncStorage.getItem('token');
    console.log("bookmark token: ", getToken);
    try {
      const res = await axios.post(`${IP}/medicine/bookmarkall`, {
        token: getToken
      });
      console.log("bookmark res.data: ", res.data);
      setMedicinedata(res.data);
      console.log("bookmarkall에서 가져온 놈임", medicinedata);
      setBookmarkmedicine(res.data || []); // bookmark가 null인 경우 빈 배열로 처리
      setTokens(getToken);
      console.log("하이류ㅜ",tokens)
    } catch (e) {
      console.log("즐겨찾기 목록 못 가져옴,,,", e);
    }
    if (getToken === null) {
      // getToken이 null일 때 빈 배열을 처리
      setBookmarkmedicine([]);
    } else {
      BookmarkListall();
    }
  };


  React.useEffect(async()=>{
    const getToken = await AsyncStorage.getItem('token');
    console.log("bookmarklist token: ", getToken);
    
    const BookmarkList = async () => {
      try {
        const res = await axios.post(`${IP}/medicine/bookmarklist`, {
          token: getToken
        });
        console.log("bookmarklist res.data: ", res.data);
        setBookmark(res.data);
        console.log("bookmarklist에서 가져온 놈임", medicinedata);
        console.log("list하이류ㅜ",tokens)
      } catch (e) {
        console.log("list즐겨찾기 목록 못 가져옴,,,", e);
      }
    };

    if (getToken === null) {
      // getToken이 null일 때 빈 배열을 처리
      setBookmark([]);
    } else {
      BookmarkList();
    }

  },[])

  return (
  <View style={styles.c}>
    {isLoading ? (
      <Loading /> // 로딩 중인 동안 로딩 3초간 스피너 표시
    ) : (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={()=>{navigation.navigate("MedicineDetail")}}>
            <Card 
            medicinedata={medicinedata} 
            bookmark={bookmark} //bookmark list넘겨줌
            token={tokens} //token bookmark로 넘겨줌
            setBookmark={setBookmark}
            setBookmarkmedicine={setBookmarkmedicine} //bookmark list를 변경하는 함수 넘겨줌
            onPress={(medicinename, bookmark) => {
              navigation.navigate('Detail', { medicinename, bookmark })
            }}
            /> 
          </TouchableOpacity>
        </ScrollView> 
      </View>
    )}
  </View>
    
  );
}

const styles = StyleSheet.create({
  c:{
    flex: 1,
    backgroundColor:'white'
  },
  container: {
     width: width,
    height: height,
    flex: 1,
    paddingTop:20,
    paddingRight:20,
    paddingLeft:20,
  },
  title: {
    borderBottomWidth:1,
    borderBottomColor: 'black',
    marginBottom: '10%',
  },
});

export default BookMarkMain;

