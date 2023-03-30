// 약 정보 보여주는 리스트 컴포넌트
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const List = ({navigation}) => {

  return (
    // <TouchableOpacity onPress={()=>{navigation.navigate("MedicineDetail")}}>
        <View style={styles.medibox}>
            <Icon style={styles.mediicon} name="medkit" size={80} color="black" />
            <View style={styles.medititletext}>
              <Text style={styles.meditext}>약 이름</Text>
              <Text>dfsdf</Text>
            </View>
        </View>          
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});


export default List;