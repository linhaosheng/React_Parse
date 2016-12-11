/**
 * Created by linhao on 2016/12/11.
 */
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Image,
    ToastAndroid
} from 'react-native'
import React, {Component} from 'react';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var ScrollableTabBar =require('react-native-scrollable-tab-view').ScrollableTabBar;
import Vedio from './Vedio'
export default class VideoNavigator extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            select:0
        };
    }
    render(){
        return (
            <ScrollableTabView
                tabBarPosition='top'
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarTextStyle={{fontSize:12}}
                onChangeTab={(obj)=>{
                this.setState({select:obj.i})
                }}>
                <Vedio tabLabel='视频偷拍' select={this.state.select} navigator={this.props.navigator}/>
                <Vedio tabLabel='欧美电影' select={this.state.select} navigator={this.props.navigator}/>
                <Vedio tabLabel='网友自拍' select={this.state.select} navigator={this.props.navigator}/>
                <Vedio tabLabel='亚洲视频' select={this.state.select} navigator={this.props.navigator}/>
                <Vedio tabLabel='欧美视频' select={this.state.select} navigator={this.props.navigator}/>
                <Vedio tabLabel='动漫视频' select={this.state.select} navigator={this.props.navigator}/>
                <Vedio tabLabel='其他视频'select={this.state.select} navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}
