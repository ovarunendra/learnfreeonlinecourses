import React, { Component } from 'react';
import { Image, Text, BackHandler } from 'react-native';
import { Container, Content, Card, CardItem, Icon } from 'native-base';
import HTML from 'react-native-render-html';
import { NavigationActions } from 'react-navigation';

class PostDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerStyle: {
                backgroundColor: '#4F6D7A',
            },
            headerTintColor: '#F5FCFF',
            headerLeft: <Icon name="ios-arrow-back" onPress={params.hideBar} style={{ marginLeft: 10, color: '#F5FCFF' }} />
        }
    };

    componentWillMount() {
        this.props.navigation.setParams({ hideBar: this._goBack });
    }

    componentDidMount() {
        const setParamAction = NavigationActions.setParams({
            params: { hideBar: false },
            key: 'Home'
        });
        this.props.navigation.dispatch(setParamAction);

        BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPressHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPressHandler);
    }

    _hardwareBackPressHandler = () => {
        this._goBack();
        return true;
    }

    _goBack = () => {
        const setParamAction = NavigationActions.setParams({
            params: { hideBar: true },
            key: 'Home'
        });
        this.props.navigation.dispatch(setParamAction);
        this.props.navigation.goBack();
    }

    render() {
        const { post } = this.props.navigation.state.params;
        const { title, imageUri, content } = post;
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem >
                            <HTML html={title} baseFontStyle={{ fontSize: 16, fontWeight: '700' }} />
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
