import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Layout } from 'antd';


import Filter from './components/Filter/Filter';
import List from './components/List/List';
import AdditionalInfoAPP from './components/AdditionalInfoAPP/AdditionalInfoAPP';
import Map from './components/Map/Map';
import AdditionalInfoViolence from './components/AdditionalInfoViolence/AdditionalInfoViolence';

const { Sider, Content, Header } = Layout;
class APPImpact extends Component {
    render() {
        return (
            <div style={{height: '900px', width: '100%'}}>
                <Layout style={{height: '100%', width: '100%'}}>
                    <Header style={{height: '13%', width:'100%', backgroundColor:'white',borderRadius: '40px 10px',borderColor:'black', borderStyle:'groove'}}>
                        <Filter />
                    </Header>
                    <Layout style={{height: '87%', width: '100%', display:'flex'}}>
                        <Sider width={'50%'}style={{height: '100%', backgroundColor:'white'}}>
                            <Content style={{height: '50%', width:'100%'}}>
                                <List />
                            </Content>
                            <Content style={{height: '50%', width:'100%'}}>
                                <AdditionalInfoAPP />
                            </Content>
                        </Sider>
                        <Layout style={{height: '100%', width: '50%'}}>
                            <Content style={{height: '65%', width: '100%'}}>
                                <Map />
                            </Content>
                            <Layout style={{height: '35%', width: '100%'}}>
                                <Content style={{height: '20%', width:'100%'}}>
                                    <AdditionalInfoViolence />
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
export default withStyles()(APPImpact);