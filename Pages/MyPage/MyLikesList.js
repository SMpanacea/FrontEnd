//내가 좋아요 누른 글 목록 화면
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Image, Button, Animated } from 'react-native';

export default function MyLikesList() {
    const [myLike, setMyLike] = useState([
        {
            id: 1,
            title: '첫 번째 글 제목',
            content: '글의 내용',
            createdAt: new Date(),
        },
    ]);

    // 15개의 더미 데이터 생성
    for (let i = 2; i <= 15; i++) {
        myLike.push({
            id: i,
            title: `${i}째 글 제목`,
      content: `글 내용`,
            createdAt: new Date(),
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={myLike}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.content}>{item.content}</Text>
                        <Text style={styles.date}>
                            {item.createdAt.toLocaleDateString()}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
});