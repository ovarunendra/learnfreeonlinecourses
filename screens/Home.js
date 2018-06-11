import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Container, Content, Spinner } from 'native-base';

import PostCard from './components/PostCard';

const getPostsQuery = gql`
    {
        healthandwellnessprogramViewer{
            posts{
                id
                title
                imageUri
                excerpt
                content
            }
        }
    }
`;

class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#4F6D7A',
        },
        headerTintColor: '#F5FCFF',
    };

    viewPost = (post) => {
        this.props.navigation.navigate('PostDetail', { post });
    }

    renderPosts = () => {
        const { data } = this.props;
        if (data.loading) {
            return <Spinner />
        }
        const { posts } = data.healthandwellnessprogramViewer;
        return posts.map(post => {
            const { title, imageUri, excerpt, id } = post;
            return (<PostCard
                key={id}
                title={title}
                imageUri={imageUri}
                excerpt={excerpt}
                viewPost={() => this.viewPost(post)}
            />);
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.renderPosts()}
                </Content>
            </Container>
        );
    }
}

export default graphql(getPostsQuery)(Home);
