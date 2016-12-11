/**
 * Created by linhao on 2016/11/20.
 */
'use strict';

import React,{Component} from 'react'
import {
    PropTypes,
    StyleSheet,
    View,
    ReactNativeBaseComponent,
    Platform,
    ToastAndroid
} from 'react-native'
var RK_SWIPE_REF = 'swiperefreshlayout';
var INNERVIEW_REF = 'innerView';
var createReactNativeComponentClass = require('../node_modules/react/lib/createReactNativeComponentClass');
var ReactNativeViewAttributes = require('../node_modules/react-native/Libraries/Components/View/ReactNativeViewAttributes');
var RCTUIManager = require('../node_modules/react-native/Libraries/BatchedBridge/NativeModules').UIManager;
var UIManager = require('../node_modules/react-native/lib/UIManager')
var NativeMethodsMixin = require('../node_modules/react/lib/NativeMethodsMixin');

export default class SwipeRefreshLayoutAndroid extends Component {

    propTypes:{
        onRefresh: PropTypes.func
        }

    static defaultProps = {
        mixins: [NativeMethodsMixin]
    }
    getInnerViewNode(){
        return this.refs[INNERVIEW_REF].getInnerViewNode();
    }
    render(){
        var refersh = this.props;
        return(
            <AndroidSwipeRefreshLayout
                {...refersh}
                ref={RK_SWIPE_REF}
                style={styles.base}
                onRefresh={this._onRefresh.bind(this,refersh)}>
                <View ref={INNERVIEW_REF} style={styles.mainSubview} collapsable={false}>
                    {refersh.children}
                </View>
            </AndroidSwipeRefreshLayout>
        );
    }
    _onRefresh(refersh){
        if (refersh.onRefresh) {
            refersh.onRefresh();
        }
    }
    startRefresh(){
        UIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            1,
            null
        );
    }
    finishRefresh(){
        ToastAndroid.show('1111111', ToastAndroid.LONG);
        UIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            2,
            null
        );
    }
    _getSwipeRefreshLayoutHandle(){
        return React.findNodeHandle(this.refs[RK_SWIPE_REF]);
    }
}
var styles = StyleSheet.create({
    base: {
        flex: 1
    },
    mainSubview: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
var AndroidSwipeRefreshLayout = createReactNativeComponentClass({
    validAttributes: ReactNativeViewAttributes.UIView,
    uiViewClassName: 'AndroidSwipeRefreshLayout',
});


