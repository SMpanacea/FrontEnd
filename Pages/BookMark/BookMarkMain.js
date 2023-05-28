// 약 즐겨찾기 후 보이는 화면 -> 약 정보 보려면 MedicineDetail.js로 넘어가야 돼!!

import axios from 'axios';
import React from 'react';
import {StyleSheet,  View, ScrollView, TouchableOpacity, AccessibilityInfo, UIManager, findNodeHandle} from 'react-native';
import { Text, TouchableRipple, Button  } from 'react-native-paper';
// 화면 비율
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');
// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Icon from 'react-native-vector-icons/FontAwesome';
import BookMarkModal from './BookMarkModal';
// 약목록 보여주는 component
import List from '../../Components/Lists';
import Card from '../../Components/Card';

// 로딩
import Loading from '../../Components/Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';


// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

function BookMarkMain({navigation}) {
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가
  const [bookmarkmedicine, setBookmarkmedicine] = React.useState([]);//즐겨찾기한 약 정보
  const [medicinedata, setMedicinedata] = React.useState([]);//약 정보

  //즐겨찾기한 약 가져오는 axios인데 로딩페이지 넣어서 다시 만들어라!
  React.useEffect( async () => {
    const getToken = await AsyncStorage.getItem('token'); 
    console.log("bookmark token : ", getToken);
    const Bookmarklsit = () => {
      axios.post(`${IP}/medicine/bookmarkall`,{
        //토큰만 보내면 즐겨찾기 가져올 수 있는 건가 아님 더 보내야 되는 건가
        token : getToken
      })
      .then(function(res){
        console.log("bookmark res.data : ", res.data);
        setMedicinedata(res.data);
        console.log("bookmarkall에서 가져온 놈임",medicinedata);
      })
      .catch(function(e){
        console.log("즐겨찾기 목록 못 가져옴,,,", e)
      })
    };
    Bookmarklsit();
    // console.log("bookmark배열 값 잘 가져오나요?",bookmark)
  },[]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <TouchableRipple onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
              <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
          </TouchableRipple>
      ),
      headerTitle: "바코드 인식",
      headerStyle: {
        elevation: 10, // 안드로이드 그림자 효과
        shadowOpacity: 0.5, // iOS 그림자 효과
        shadowColor: 'black', // 그림자 색상 설정
        shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
        shadowRadius: 4, // 그림자 반경 설정
      },
    });
  }, [])


  return (
  <View style={styles.c}>
    {isLoading ? (
      <Loading /> // 로딩 중인 동안 로딩 3초간 스피너 표시
    ) : (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={()=>{navigation.navigate("MedicineDetail")}}>
            <Card medicinedata={medicinedata} />
            {/* <List /> */}
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
  medibox: {
    flex:1,
    flexDirection: 'row',
    alignItems: "center",
    borderWidth:1,
    borderBottomColor: 'black',
    marginBottom: '10%',
  },
  mediicon:{
    borderWidth:1,
    // height:'100%',
    justifyContent: "center",
    alignItems: "center",
  },
  medititletext:{
     borderWidth:1,
     borderColor:'blue',
     width:'70%',
    justifyContent: "center",
    alignItems: "center",
  },
  meditext:{
    borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
  },
  medimodal:{
    flex: 1, 
    // borderBottomWidth:1,
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default BookMarkMain;

