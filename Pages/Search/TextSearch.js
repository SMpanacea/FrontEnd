// 글로 검색할 때 보이는 화면
import React from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated, TextInput} from 'react-native';

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Search from '../../Components/Search';
import Icon4 from 'react-native-vector-icons/FontAwesome';

// 서버
import ServerPort from '../../Components/ServerPort';
import List from '../../Components/Lists';
// import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
const IP = ServerPort();
let count = 0

function TextSearch({navigation}) {
  const [input, setInput] = React.useState("");//내가 검색
  const [medicinedata, setMedicinedata] = React.useState([]);//서버에서 가져온 데이터 내보내기

  const search = async (keyword) =>{


    await axios.get(`${IP}/medicine/search`,{
      params:{
        // 약이름, page번호 요청
        itemName: keyword,
      }
    })
    .then(function(res){
      // console.log("Medicin 이름 데이터 잘 받아왔나요?: ", res.data);
      console.log("검색", keyword)
      setMedicinedata(res.data.items);
      console.log('count:', count++)
    })
    .catch(function(error){
      console.log("Medicin 이름 목록 가져오기 실패,,,", error)
    })
  }

  React.useEffect(()=>{
    search();
  },[]);
  
  const handleButtonPress = () => {
    search(input);
  };

  const handleClearInput = async () => {
    setInput("");
    setMedicinedata([]); // setMedicinedata([])를 먼저 호출하면 input 값이 변경되기 전에 state 값이 변경되므로 setInput("") 이후에 호출합니다.
    await search();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{flex:1, flexDirection: 'row', justifyContent:"space-between"}}>
        <View >
          <TextInput
            value={input} 
            onChangeText={(text)=>setInput(text)}
            style={{fontSize:15, backgroundColor:'gray', color:'white', marginBottom:10,width:250}} 
            placeholder="Search"
            clearButtonMode="while-editing" // clear 버튼이 text 입력 중일 때만 보이도록 설정
            />
        </View>
      
        <TouchableOpacity  onPress={()=>{handleClearInput()}}>
          <Text style={{borderWidth:1}}>
            지우기
          </Text>
        </TouchableOpacity>
          
        <View>
          <TouchableOpacity onPress={()=>{handleButtonPress()}}>
            <Icon4 name="search" color='black' size={25} />
          </TouchableOpacity>
        </View>
      </View>

        <List medicinedata={medicinedata}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    borderBottomWidth:1,
    borderBottomColor: 'black',
    marginBottom: '10%',
  },
  warningbox: {
    flex:1,
    flexDirection: 'row',
    alignItems: "center",
    borderWidth:1,

    marginBottom: '5%',
    height:150,
    padding:20
  },
  warningtext:{
    flex:1,
  },
  loginbox:{
    flex: 2,
    height:410,
    borderWidth:1,
    borderColor:"black",
    padding:20
    // justifyContent: 'center',
  },
  loginsbox:{
    flex:1,
    justifyContent: "center",
  },
  login:{
    flex:1, 
    marginBottom:10, 
    justifyContent: 'center',
  },
  loginbutton:{
    borderBottomWidth:1,
    borderBottomColor:'red',
    marginBottom:10,
  },

  easy:{
    flex:2,
  },
  easybox:{
    flex:1,
    borderBottomWidth:1,
    marginBottom:20,
    justifyContent: "center",
  },
  kakaobutton:{
    flex:1,
    borderWidth:1,
    backgroundColor:'yellow',
    alignItems: "center",
    justifyContent: "center",
    borderRadius:30,
    marginBottom:20,
  },
  googlebutton:{
    flex:1,
    borderWidth:1,
    backgroundColor:'blue',
    alignItems: "center",
    justifyContent: "center",
    borderRadius:30,
    marginBottom:20
  }
  
  
});

export default TextSearch;

