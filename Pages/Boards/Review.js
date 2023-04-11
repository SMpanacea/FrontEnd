// 리뷰 디테일 보여주는 화면
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Constants from 'expo-constants';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Review() {
    const [post, setPost] = useState(null);

    return (
        <SafeAreaView style={styles.box}>
            <Text style={styles.title}>안뇽 여기 제목 들어올 자리얌</Text>
            <Text style={styles.content}>내용글 들어갈 자리</Text>
            <Button title="약 보러가기" />
        <View style={[styles.row, styles.marginTop]}>
        <TextInput
          placeholder="댓글을 입력하세요"
        //   value={comment}
        //   onChangeText={(text) => setComment(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 6, flex: 1 }}
        />
        <Button 
        // onPress={handleCommentSubmit} 
        style={{ marginTop: 8 }}
        title="등록"
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>댓글 목록</Text>
        {/* 댓글 데이터를 가져와서 렌더링하는 코드 */}
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="대댓글을 입력하세요"
        //   value={reply}
        //   onChangeText={(text) => setReply(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, flex: 1 }}
        />
        <Button 
        // onPress={handleCommentSubmit} 
        style={{ marginTop: 8 }}
        title="등록"
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>대댓글 목록</Text>
        {/* 대댓글 데이터를 가져와서 렌더링하는 코드 */}
      </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 30,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        marginBottom: 25
    },
    icon: {
        marginRight: 10,
      },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      content: {
        fontSize: 16,
        marginBottom: 30
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5, 
    },
     marginTop: {
        marginTop:30
     }
})