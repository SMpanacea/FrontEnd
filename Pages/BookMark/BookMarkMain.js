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

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

function BookMarkMain({navigation}) {
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가
  const [bookmarkmedicine, setBookmarkmedicine] = React.useState([]);//즐겨찾기한 약 정보
  const [medicinedata, setMedicinedata] = React.useState([]);//약 정보

  //즐겨찾기한 약 가져오는 axios인데 로딩페이지 넣어서 다시 만들어라!
  React.useEffect(()=>{
    const Bookmarklsit = () => {
      axios.post(`${IP}/medicine/bookmarkall`,{
        //토큰만 보내면 즐겨찾기 가져올 수 있는 건가 아님 더 보내야 되는 건가
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibW9ua2V5MyIsImV4cCI6MTY4NTA5NTAxNCwiaWF0IjoxNjg0NDkwMjE0fQ.F9ZRcSS5Jb6zmFR6awLORFCsSxZvfBKCR1Mra8T00lQ"//걍 지정해줌
      })
      .then(function(res){
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
  },
  container: {
     width: width,
    height: height,
    flex: 1,
    paddingTop:20,
    paddingRight:20,
    paddingLeft:20,
    backgroundColor:'#eaeaea'
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

