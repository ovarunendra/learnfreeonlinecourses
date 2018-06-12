import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Card, CardItem, Button } from 'native-base';
import HTML from 'react-native-render-html';

class PostCard extends Component {
    render() {
        const { title, imageUri, excerpt, viewPost } = this.props;
        return (
            <Card style={{ marginLeft: 10, marginRight: 10 }}>
                <CardItem >
                    <HTML html={title} baseFontStyle={{ fontSize: 16, fontWeight: '700' }} />
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: imageUri }}
                        style={{ height: 200, flex: 1 }} />
                </CardItem>
                <CardItem cardBody style={{ margin: 10 }}>
                    <HTML html={excerpt} />
                </CardItem>
                <Button full primary onPress={() => viewPost()}>
                    <Text style={{ color: 'white' }}>Read Full Article</Text>
                </Button>
            </Card>
        );
    }
}

export default PostCard;
