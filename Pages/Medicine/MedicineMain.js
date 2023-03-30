// 모든 약 정보 볼 수 있는 메인화면
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Icon from 'react-native-vector-icons/FontAwesome';

// 약목록 보여주는 component
import List from '../../Components/Lists';


function MedicineMain({navigation}) {
  return (

    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>모든 약 확인할 수 있는 곳</Text>

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

