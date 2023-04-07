// 게시판 글 등록할 때 보이는 화면
import axios from 'axios';
import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Write() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => { onSearch(searchTerm); };

    const addPost = () => {
        setPosts([...posts, { title: title, content: content }]);
        setTitle('');
        setContent('');
    };

    return (
        <SafeAreaView style={styles.box}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 30,  marginBottom: 10 }}>게시판</Text>
            <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20 }}>글 작성하기</Text>
            <View style={{ padding: 20 }}>
                <TextInput
                    style={{ marginBottom: 10, borderWidth: 1, borderColor: '#333', padding: 10 }}
                    placeholder="제목"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={{ marginBottom: 10, borderWidth: 1, borderColor: '#333', padding: 10, height: 200 }}
                    placeholder="내용"
                    multiline={true}
                    value={content}
                    onChangeText={setContent}
                />
                <View style={styles.container}>
                <Icon name="search" size={20} color="#bbb" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="연관된 약 찾기"
                    // value={searchTerm}
                    // onChangeText={setSearchTerm}
                    />
                </View>
                {/* todo: 약 검색 결과 출력 */}
                <Button title="작성하기" onPress={addPost} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
        // marginHorizontal: 61,
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
})