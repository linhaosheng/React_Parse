/**
 * Created by linhao on 2016/11/20.
 */
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ListView,
    TouchableHighlight,
    Navigator,
    Image,
    ToastAndroid
} from 'react-native'
import React, {Component} from 'react';
import DataRepositor from '../utils/DataRepositor';
import PictureView from './PictureView';
import SwipeRefreshLayoutAndroid from '../utils/SwipeRefreshLayoutAndroid';
export default class Picture extends Component {
    // 构造
    constructor(props) {
        super(props);
        var totalList = new Array();
        var pageSize = 24;
        this.swipeRefresh = new SwipeRefreshLayoutAndroid();
        this.repositor = new DataRepositor();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        // 初始状态
        this.state = {
            load: false,
            select: 0,
            error: false,
            foot: 0,
            startLoad: false,
            pageNum: 1,
            moreText: '正在加载',
            totalList: totalList,
            pageSize: pageSize,
            dataSource: ds
        };
    }

    _navigate(picNum :Number,pageNum :String) {
        this.props.navigator.push({
            component: PictureView,
            name: 'PictureView',
            params: {
                pageNum : pageNum,
                select : picNum
            }
        });
    }

    startFrfersh() {
        // ToastAndroid.show('start...............', ToastAndroid.SHORT);
        this.swipeRefresh.startRefresh.bind(this);
        this.setState({pageNum: 1})
        this.getData();
    }

    componentWillMount() {
        switch (this.props.select) {
            case 0:
                this.setState({select: 9});
                break;
            case 1:
                this.setState({select: 1});
                break;
            case 2:
                this.setState({select: 2});
                break;
            case 3:
                this.setState({select: 3});
                break;
            case 4:
                this.setState({select: 4});
                break;
            case 5:
                this.setState({select: 6});
                break;
            case 6:
                this.setState({select: 7});
                this.getData();
                break;
            case 7:
                this.setState({select: 8});
                break;
        }
    }

    componentDidMount() {
        this.getData();
    }
    componentWillReceiveProps() {
        var refersh = this.props.pictureRefersh;
        this.setState({startLoad: refersh})
        if (this.state.startLoad = true) {
            this.startFrfersh();
        }
    }

    stopRefersh() {
        //   ToastAndroid.show('stop...............', ToastAndroid.SHORT);
        this.swipeRefresh.finishRefresh.bind(this);
    }
    
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    getData() {
        this.repositor.getPicture(this.state.select, this.state.pageNum).then((responseData) => {
            let list = responseData;
            let currentCount = list.length;
            if (currentCount < this.state.pageSize) {
                this.setState(
                    {
                        foot: 1,
                        moreText: '加载完毕'
                    }
                );
            } else {
                this.setState({foot: 0});
            }
            this.setState({
                totalList: this.state.totalList.concat(list)
            });
            if (responseData != null) {
                this.stopRefersh()
                this.setState({startLoad: false})
            }
            this.setState({
                load: true,
                dataSource: this.state.dataSource.cloneWithRows(this.state.totalList)
            });
        }).catch((error) => {
            this.setState({
                load: true,
                error: true,
                startLoad: false
            })
        }).done();
    }

    _renderFooter() {
        if (this.state.foot === 1) {//加载完毕
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'flex-start'}}>
                    <Text style={{color:'black',fontSize:12,marginTop:10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../image/load.gif')} style={{width:20,height:20}}/>
                </View>);
        }
    }

    _endReached() {
        if (this.state.foot != 0) {
            return;
        }
        this.setState({
            foot: 2,
        });
        this.timer = setTimeout(
            () => {
                this.setState({
                    pageNum: this.state.pageNum + 1
                });
                this.getData();
            }, 500);
    }

    _rendRow(dataSource) {
        var url = dataSource.url;
        var first = url.lastIndexOf('/') + 1;
        var last = url.lastIndexOf('.');
        var pageNum = url.substring(first, last);
        return (
            <TouchableHighlight underlayColor='#c8c7cc' onPress={this._navigate.bind(this,this.state.select,pageNum )}>
                <View style={styles.itemContainer}>
                    <Text style={styles.textStyle}>
                        {dataSource.title}
                    </Text>
                    <Text style={styles.textTimeStyle}>
                        {dataSource.time}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    _renderSeparator(sectionID:number, rowID:number, adjacentRowHighlighted:bool) {
        return (
            <View key={`{sectionID}-${rowID}`}
                  style={{height: 1, backgroundColor: 'black'}}>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._rendRow.bind(this)}
                    renderSeparator={this._renderSeparator}
                    enableEmptySections={true}
                    navigator={this.props.navigator}
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReached={this._endReached.bind(this)}
                    onEndReachedThreshold={0}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 10
    },
    textStyle: {
        color: 'black',
        fontSize: 15,
        marginTop: 5,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: 200,
        marginLeft: 10
    },
    textTimeStyle: {
        fontSize: 15,
        marginRight: 5,
        marginTop: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
})