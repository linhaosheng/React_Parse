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
import Movie from './Movie'
export default class MovieNavigator extends Component {
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
                <Movie tabLabel='中文无码' select={this.state.select} navigator={this.props.navigator}/>
                <Movie tabLabel='中文有码' select={this.state.select} navigator={this.props.navigator}/>
                <Movie tabLabel='欧美无码' select={this.state.select} navigator={this.props.navigator}/>
                <Movie tabLabel='韩国无码' select={this.state.select} navigator={this.props.navigator}/>
                <Movie tabLabel='日本无码' select={this.state.select} navigator={this.props.navigator}/>
                <Movie tabLabel='日本有码' select={this.state.select} navigator={this.props.navigator}/>
                <Movie tabLabel='偷拍自拍'select={this.state.select} navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}
