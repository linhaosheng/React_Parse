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
import Picture from './Picture'
export default class PictureNavigator extends Component {
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
                <Picture tabLabel='偷拍自拍' select={this.state.select} navigator={this.props.navigator}/>
                <Picture tabLabel='亚洲图片' select={this.state.select} navigator={this.props.navigator}/>
                <Picture tabLabel='欧美图片' select={this.state.select} navigator={this.props.navigator}/>
                <Picture tabLabel='卡通动漫' select={this.state.select} navigator={this.props.navigator}/>
                <Picture tabLabel='乱伦性爱' select={this.state.select} navigator={this.props.navigator}/>
                <Picture tabLabel='另类图片' select={this.state.select} navigator={this.props.navigator}/>
                <Picture tabLabel='美腿丝袜'select={this.state.select}  navigator={this.props.navigator}/>
                <Picture tabLabel='清纯唯美' select={this.state.select} navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}
