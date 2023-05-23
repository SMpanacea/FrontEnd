// main에서 알약 검색 누르면 보이는 화면
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function CameraSearchMain({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                mode="outlined"
                style={styles.down}
                contentStyle={styles.button}
                labelStyle={{ fontSize: 20 }}
                //기창이형 코드 합치면 그 때 넣어 줄 예정
                onPress={console.log("카머라 버튼 눌림")}>카메라로 알약 검색</Button>
            <Button
                mode="outlined"
                style={styles.down}
                contentStyle={styles.button}
                labelStyle={{ fontSize: 20 }}
                onPress={() => navigation.navigate('TextSearch')}>이름으로 알약 검색</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 130, 
        width: 300, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    down: {
        marginBottom:60
    }
});