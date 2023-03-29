//즐겨찾기 등록할 때 나오는 모달 화면

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';

// icon import -> npm install react-native-vector-icons --save (--save해서 install 하면 다른 사람한테 파일 넘겨줄 때 다시 import 안 해줘도 된다.)
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';

// 검색할 때 필요
// npm install @rneui/themed --save해줭
import { SearchBar } from '@rneui/themed';

import Search from '../../Components/Search';

const MediModalbox = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () =>{
     if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };




  return(
     <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalbox, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );

};

function BookMarkModal() {
  const [visible, setVisible] = React.useState(false);
  return (
      <View style={styles.container}>
        <MediModalbox visible={visible}>
            <View style={styles.center}>
              <View style={styles.modalhead}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require('../../assets/x.png')}
                    style={{height: 20, width: 20, marginBottom:30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
           
            <View style={styles.moidalbutton}>
             <Search />
            </View>

            <View>
              <Text>
                여기에는 검색한것들 나오게 해야돼
              </Text>
            </View>

            <View style={styles.updatebox}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.update}>
                  등록
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/success.png')}
                style={{height: 150, width: 150, marginVertical: 10}}
              />
            </View>

            <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
              Congratulations registration was successful
            </Text> */}
      </MediModalbox>

{/* 이이이이잉이 다른 vs코드에서는 Touchable쪽에 onPress넣어도 잘 실행 됐는데 여기는 Icon에 넣어야 실행 돼 이게 뭐람 일단 성공은 함ㅋㅋ */}
          <View style={styles.pluesbox}>
            <TouchableOpacity title ="Open Modal" onPress={() => setVisible(true)} style={styles.pluestouch}>
              <Icon2 onPress={() => setVisible(true)} style={styles.plues} name="pluscircle" size={70} color="black" />
            </TouchableOpacity>
    
          </View>
        

      </View>
      
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height:'100%', 
    width:'100%'

  },
  center:{
    alignItems: 'center'
  },
  moidalbutton:{
    marginBottom:10
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updatebox:{
    justifyContent: 'center', 
    alignItems: 'center', 
    alignItems: 'center',
    marginTop:20
  },
  update:{
    borderWidth:1,
    backgroundColor:'black',
    color:'white',
    borderRadius:10,
    paddingLeft:10,
    paddingRight:8
    // justifyContent: 'center', 
    // alignItems: 'center', 
    // alignItems: 'center'
  },
  modalbox:{
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalhead:{
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pluesbox:{
    // borderWidth:1, 
    // borderColor:"blue", 
    bottom:150, 
    height:100, 
    width:100, 
    left:150,  
    bottom:60
  },
  pluestouch:{
    // borderWidth:1, 
    // borderColor:"green", 
    marginTop:10,     
    justifyContent: 'center',
  },
  plues:{
    // borderWidth:1, 
    // borderColor:"red",
    height:'100%',
    width:100,
    padding:10,
    marginTop:10,
    // marginTop:10
    // position : 'absolute',
    // alignItems: 'center',
    // top:10,
    // marginTop:10,
    // height:'100%',
    // bottom:'0%',
    // left:55,
    // right:'0%',
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalbox:{
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalhead:{
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
});

export default BookMarkModal;

