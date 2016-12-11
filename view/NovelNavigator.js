/**
 * Created by linhao on 2016/12/10.
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
import Novel from './Novel'
export default class NovelNavigator extends Component {
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
                <Novel tabLabel='情感小说' select={this.state.select} navigator={this.props.navigator}/>
                <Novel tabLabel='校园春色' select={this.state.select} navigator={this.props.navigator}/>
                <Novel tabLabel='人妻女友' select={this.state.select} navigator={this.props.navigator}/>
                <Novel tabLabel='武侠古典' select={this.state.select} navigator={this.props.navigator}/>
                <Novel tabLabel='家庭乱伦' select={this.state.select} navigator={this.props.navigator}/>
                <Novel tabLabel='另类小说' select={this.state.select} navigator={this.props.navigator}/>
                <Novel tabLabel='性爱技巧'select={this.state.select} navigator={this.props.navigator}/>
                <Novel tabLabel='情色笑话' select={this.state.select} navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}
