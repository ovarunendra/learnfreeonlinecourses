import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Text } from 'react-native';
import { Container, Content, Spinner, Button } from 'native-base';

import PostCard from './components/PostCard';

let page = 1;

const getPostsQuery = gql`
    query($page: Int){
        healthandwellnessprogramViewer{
            posts(page: $page){
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
        const { healthandwellnessprogramViewer } = this.props;
        const { posts } = healthandwellnessprogramViewer;
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

    loadMore = () => {
        const { loadMore } = this.props;
        page++;
        loadMore(page);
    }

    renderLoading = () => {
        const { loading } = this.props;
        if (loading) {
            return <Spinner />
        }
        return (<Button full info onPress={() => this.loadMore()}>
            <Text style={{ color: 'white' }}>Load More Articles</Text>
        </Button>);
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.renderPosts()}
                    {this.renderLoading()}
                </Content>
            </Container>
        );
    }
}

Home.defaultProps = { healthandwellnessprogramViewer: { posts: [] } };

const withPostsData = graphql(getPostsQuery, {
    options: () => {
        return {
            variables: {
                page: 1
            },
            notifyOnNetworkStatusChange: true,
            ssr: true
        };
    },
    props: ({ params, data: { loading, healthandwellnessprogramViewer, fetchMore } }) => ({
        loading,
        healthandwellnessprogramViewer,
        loadMore(page) {
            return fetchMore({
                variables: {
                    page,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult || fetchMoreResult.healthandwellnessprogramViewer.posts === null) {
                        return previousResult;
                    }

                    const { healthandwellnessprogramViewer } = fetchMoreResult;

                    return Object.assign({}, previousResult, {
                        healthandwellnessprogramViewer: {
                            posts: [...previousResult.healthandwellnessprogramViewer.posts, ...healthandwellnessprogramViewer.posts],
                            __typename: 'HealthandwellnessprogramViewer'
                        },
                    });
                }
            });
        },
    }),
});

export default withPostsData(Home);
