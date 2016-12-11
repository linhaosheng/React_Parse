/**
 * Created by linhao on 2016/11/20.
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
import DataRepositor from '../utils/DataRepositor';
import VideoView from './VideoView'
export default class Vedio extends Component {
    // 构造
    constructor(props) {
        super(props);
        var totalList = new Array();
        var pageSize = 24;
        this.repositor1 = new DataRepositor();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        // 初始状态
        this.state = {
            load: false,
            error: false,
            foot: 0,
            pageNum: 1,
            select: 1,
            classify: 'dylist',
            moreText: '正在加载',
            totalList: totalList,
            pageSize: pageSize,
            dataSource: ds
        };
    }

    _navigate(classify:String,videoNum:Number,pageNum :String, title:String) {
        this.props.navigator.push({
            component: VideoView,
            name: 'VideoView',
            params: {
                pageNum :pageNum ,
                title: title,
                classify:classify,
                videoNum:videoNum
            }
        });
    }

    componentWillMount() {
        switch (this.props.select) {
            case 0:
                this.setState({select: 1, classify: 'dylist'});
                break;
            case 1:
                this.setState({select: 3, classify: 'dylist'});
                break;
            case 2:
                this.setState({select: 1, classify: 'vodlist'});
                break;
            case 3:
                this.setState({select: 2, classify: 'vodlist'});
                break;
            case 4:
                this.setState({select: 3, classify: 'vodlist'});
                break;
            case 5:
                this.setState({select: 4, classify: 'vodlist'});
                break;
            case 6:
                this.setState({select: 5, classify: 'vodlist'});
                break;
        }
    }

    componentDidMount() {
        this.getData();
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    getData() {
        this.repositor1.getVedio(this.state.select, this.state.pageNum, this.state.classify)
            .then((responseData) => {
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
                this.setState({
                    load: true,
                    dataSource: this.state.dataSource.cloneWithRows(this.state.totalList)
                });
            }).catch((error)=> {
            this.setState({
                load: true,
                error: true
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

    _rendRow1(dataSource) {
        var url = dataSource.url;
        var first = url.lastIndexOf('/') + 1;
        var last = url.lastIndexOf('.');
        var pageNum = url.substring(first, last);
        return (
            <TouchableHighlight underlayColor='#c8c7cc' onPress={this._navigate.bind(this,this.state.classify,this.state.select,pageNum,dataSource.title)}>
                <View style={styles.itemContainer}>
                    <Image style={styles.imageStyle}
                           source={{uri:dataSource.img}}>
                    </Image>
                    <Text style={styles.textStyle}>
                        {dataSource.title}
                    </Text>
                    <Text style={styles.textTimeStyle}>
                        {dataSource.time}
                    </Text>
                </View>
            </TouchableHighlight>
        );
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
            <View style={styles.contain}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._rendRow1.bind(this)}
                    enableEmptySections={true}
                    renderSeparator={this._renderSeparator}
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
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10
    },
    textStyle: {
        color: 'black',
        fontSize: 15,
        marginTop: 5,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: 200,
    },
    textTimeStyle: {
        fontSize: 15,
        marginRight: 5,
        marginTop: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    imageStyle: {
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        width: 50
    }
})
