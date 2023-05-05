// 약 즐겨찾기 후 보이는 화면 -> 약 정보 보려면 MedicineDetail.js로 넘어가야 돼!!

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Icon from 'react-native-vector-icons/FontAwesome';
import BookMarkModal from './BookMarkModal';
// 약목록 보여주는 component
import List from '../../Components/Lists';

// 화면 비율
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');


function BookMarkMain({navigation}) {
  return (

    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>즐겨찾기한 약 확인하는 곳</Text>

        
        
      <TouchableOpacity onPress={()=>{navigation.navigate("MedicineDetail")}}>
        <List />
      </TouchableOpacity>

      {/* 밑에 있는 것들 나중에 지울 예정 -> 위에 있는걸로 반복문 만들어서 서버에서 값 있으면 계속 출력되게 수정해야 됌!! */}
        
        <View style={styles.medibox}>
          <Icon name="medkit" size={80} color="black" />
        </View>

        <View style={styles.medibox}>
          <Icon name="medkit" size={80} color="black" />
        </View>

        <View style={styles.medibox}>
          <Icon name="medkit" size={80} color="black" />
        </View>

        <View style={styles.medibox}>
          <Icon name="medkit" size={80} color="black" />
        </View>
       </ScrollView> 

      <View style={styles.medimodal}>
        {/* <MediModal /> */}
        <BookMarkModal/>
      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    width: width-15,
    // height: height,
    flex: 1,
    padding: 24,
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

