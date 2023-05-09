//카메라 스캔 후 5개 목록 보여줄 화면
import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity , Button} from 'react-native';

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Icon from 'react-native-vector-icons/FontAwesome';
import BookMarkModal from '../BookMark/BookMarkModal';
// 약목록 보여주는 component
import List from '../../Components/Lists';
import Card from '../../Components/Card'

// 화면 비율
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');

// 로딩
import Loading from '../../Components/Loading';


// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

function MedicineCamera({navigation}) {

  const [medicinedata, setMedicinedata] = React.useState([]);//약 정보
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가

  // React.useEffect(()=>{
  //   const setData = async () =>{
  //     await axios.get(`${IP}/medicine/search`,{
  //     })
  //     .then(function(res){
  //       // console.log("res데이터 잘 받아왔나요?: ", res.data);
  //       // console.log("페이지", page)
  //       setMedicinedata(res.data.items);
  //     })
  //     .catch(function(error){
  //       console.log("Medicin 목록 가져오기 실패,,,", error)
  //     })
  //   }
  //   setData();
  //   // console.log("랜더링 되나?")
  // },[]);

  React.useEffect(()=>{
    const setData = async () =>{
      setIsLoading(true); // 로딩 상태 true 로 변경
      try{
        const res = await axios.get(`${IP}/medicine/search`,{
        });
        setMedicinedata(res.data.items);
      } catch(error){
        console.log("Medicin 목록 가져오기 실패,,,", error)
      } finally {
        setIsLoading(false); // 로딩 상태 false 로 변경
      }
      // await axios.get(`${IP}/medicine/search`,{
      // })
      // .then(function(res){
      //   // console.log("res데이터 잘 받아왔나요?: ", res.data);
      //   // console.log("페이지", page)
      //   setMedicinedata(res.data.items);
      // })
      // .catch(function(error){
      //   console.log("Medicin 목록 가져오기 실패,,,", error)
      // })
    }
    setData();
    // console.log("랜더링 되나?")
  },[]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading /> // 로딩 중인 동안 로딩 스피너 표시
      ) : (
        <ScrollView style={{margin:10}}>
          <Card medicinedata={medicinedata}/>
        </ScrollView> 
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
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

export default MedicineCamera;

