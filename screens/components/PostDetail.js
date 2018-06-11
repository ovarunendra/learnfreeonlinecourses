import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base';
import HTML from 'react-native-render-html';

class PostDetail extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#4F6D7A',
        },
        headerTintColor: '#F5FCFF',
    };

    render() {
        const { post } = this.props.navigation.state.params;
        const { title, imageUri, content } = post;
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem >
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>{title}</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: imageUri }}
                                style={{ height: 200, flex: 1 }} />
                        </CardItem>
                        <CardItem cardBody style={{ margin: 10 }}>
                            <HTML html={content} />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default PostDetail;
