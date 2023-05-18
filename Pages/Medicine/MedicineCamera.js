//카메라 스캔 후 5개 목록 보여줄 화면
import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity , Button} from 'react-native';

// navigation
import 'react-native-gesture-handler';


// 약목록 보여주는 component
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
  // // 카메라 이미지 잘 넘어오는지 테스트용으로 한번 해보는 거임
  // const image = navigation.getParam('image', []);
  // console.log("image배열 잘 받아오냐?", image)
  const [medicinedata, setMedicinedata] = React.useState([]);//약 정보
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가
  // console.log("야@!!@!@!@!!@잘 오냐?",props); // 확인하려는 props 로그 출력
  // React.useEffect(()=>{
  //   const setData = async () =>{
  //     setIsLoading(true); // 로딩 상태 true 로 변경
  //     try{
  //       const res = await axios.get(`${IP}/medicine/search`,{
  //       });
  //       setMedicinedata(res.data.items);
  //     } catch(error){
  //       console.log("Medicin 목록 가져오기 실패,,,", error)
  //     } finally {
  //       setIsLoading(false); // 로딩 상태 false 로 변경
  //     }
  //   }
  //   setData();
  // },[]);
  React.useEffect(() => {
    const setData = async () => {
      setIsLoading(true); // 로딩 상태 true 로 변경
      try {
        const res = await axios.get(`${IP}/medicine/search`, {
        });
        setMedicinedata(res.data.items);
        setTimeout(() => {
          setIsLoading(false); // 3초 후 로딩 상태 false 로 변경
        }, 4000); // 3초의 지연 시간 설정
      } catch (error) {
        console.log('Medicine 목록 가져오기 실패', error);
        setIsLoading(false); // 에러 발생 시에도 로딩 상태 false 로 변경
      }
    };
    setData();
  }, []);

  return (

  //   <View style={styles.container}>
  //   {photos.map((photo, index) => (
  //     <Image key={index} source={{ uri: photo }} style={styles.image} />
  //   ))}
  // </View>
    <View style={styles.c}>
      {isLoading ? (
        <Loading /> // 로딩 중인 동안 로딩 스피너 표시
      ) : (
        <View style={styles.container}>
          <ScrollView style={{margin:10}}>
            <Card medicinedata={medicinedata}/>
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

export default MedicineCamera;

