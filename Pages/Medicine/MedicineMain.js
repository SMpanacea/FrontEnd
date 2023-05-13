// 모든 약 정보 볼 수 있는 메인화면
import axios from 'axios';
import React from 'react';
import {StyleSheet,  View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TouchableRipple, Button  } from 'react-native-paper';
// 화면 비율
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Icon from 'react-native-vector-icons/FontAwesome';
import BookMarkModal from '../BookMark/BookMarkModal';
// 약목록 보여주는 component
import List from '../../Components/Lists';
import Card from '../../Components/Card';

// 로딩
import Loading from '../../Components/Loading';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

function MedicineMain({navigation}) {

  const [medicinedata, setMedicinedata] = React.useState([]);//약 정보
  const [page, setPage] = React.useState(1);//다음 page 번호
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가

  // React.useEffect(()=>{
  //   const setData = async () =>{
  //     await axios.get(`${IP}/medicine/search`,{
  //       params: {
  //         pageNo: page, // 동적으로 변경되는 페이지 번호 값
  //       },
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
  // },[page]);//페이지 번호가 변경될 때마다 실행되도록 해줌

  React.useEffect(() => {
    const setData = async () => {
      setIsLoading(true); // 로딩 상태 true 로 변경
      try {
        const res = await axios.get(`${IP}/medicine/search`, {
          params: {
            pageNo: page,
          },
        });
        setMedicinedata(res.data.items);
      } catch (error) {
        console.log('Medicine 목록 가져오기 실패', error);
      } finally {
        setIsLoading(false); // 로딩 상태 false 로 변경
      }
    };
    setData();
  }, [page]);

  const handlePageChange = (newPage) => {
    // console.log("페이지 바뀜?",newPage)
    setPage(newPage);
  }

//  // 로딩 스피너를 호출하는 함수
//  const renderLoadingIndicator = () => {
//   if (isLoading) {
//     return <Loading />;
//   } else {
//     return null;
//   }
// };


  // return (
  //   <View style={styles.container}>
  //     <ScrollView style={{margin:10}}>
  //       {/* <Text style={styles.title}>모든 약 확인할 수 있는 곳</Text> */}

  //         {/* <List medicinedata={medicinedata}/> */}
  //         <Card medicinedata={medicinedata} />
  //     </ScrollView> 
  //     <View style={{flexDirection: 'row',justifyContent:"space-between", alignItems:'center', marginTop:-10}}>
  //       <TouchableRipple onPress={()=>{page > 1 && handlePageChange(page -1)}}>
  //         <Button mode="Outlined">이전 페이지</Button>
  //       </TouchableRipple>
  //       <Text>{page}</Text>
  //       <TouchableRipple onPress={()=>{handlePageChange(page +1)}}>
  //         <Button mode="Outlined">다음 페이지</Button>
  //       </TouchableRipple>
  //     </View>
      
  //   </View>
  // );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading /> // 로딩 중인 동안 로딩 스피너 표시
      ) : (
        <ScrollView style={{margin:10}}>
          <Card 
            medicinedata={medicinedata} 
            onPress={(medicinename) => navigation.navigate('Detail', { medicinename })}
          />
          <View style={{flexDirection: 'row',justifyContent:"space-between", alignItems:'center'}}>
         <TouchableRipple onPress={()=>{page > 1 && handlePageChange(page -1)}}>
           <Button mode="Outlined">이전 페이지</Button>
         </TouchableRipple>
         <Text>{page}</Text>
         <TouchableRipple onPress={()=>{handlePageChange(page +1)}}>
           <Button mode="Outlined">다음 페이지</Button>
         </TouchableRipple>
      </View>
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

export default MedicineMain;

