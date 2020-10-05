
import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class Home extends Component {
    render() {
        return (
            <Layout>
            <Header>Header</Header>
            <Layout>
                <Content>Content</Content>
                <Sider>Sider</Sider>
            </Layout>
            <Footer>Footer</Footer>
            </Layout>
        );
    }
}
export default withStyles()(Home);