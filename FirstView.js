/**
 * Created by linhao on 2016/12/4.
 */

import {
    StyleSheet,
    Text,
    View,
    Image,
    BackAndroid,
    ToastAndroid
} from 'react-native';
import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import SwipeRefreshLayoutAndroid from './utils/SwipeRefreshLayoutAndroid';
import PictureNavigator from './view/PictureNavigator';
import NovelNavigator from './view/NovelNavigator';
import VideoNavigator from './view/VideoNavigator';
import MovieNavigator from './view/MovieNavigator';
export default class React_Parse extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab: '图片',
            refershTab:0,
            pictureRefersh:false,
            novelRefersh:false,
            videoRefresh:false,
            movieRefresh:false
        };
    }
    onRefresh() {
       switch (this.state.selectedTab) {
           case '图片':
               this.setState({refershTab: 0,pictureRefersh:true});
               break;
           case '小说':
               this.setState({refershTab: 1,novelRefersh:true});
               break;
           case '视频':
               this.setState({refershTab: 2,videoRefresh:true});
               break;
           case '电影':
               this.setState({refershTab: 3,movieRefresh:true});
               break;
       }
    }
    render() {
        return (
            <View style={styles.container}>
                <SwipeRefreshLayoutAndroid
                  ref='swiperefreshlayout'
                    onSwipeRefresh={this.onRefresh.bind(this)}
                >
                <TabNavigator>
                    <TabNavigator.Item
                        title="图片"
                        selected={this.state.selectedTab=='图片'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectTab}
                        renderIcon={() => <Image style={styles.icon} source={require("./image/picture.png")} />}
                        onPress={() => this.setState({selectedTab : '图片'})}
                    >
                        <PictureNavigator navigator={this.props.navigator} refresh={this.state.pictureRefersh}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="小说"
                        selected={this.state.selectedTab=='小说'}
                        titleStyle={styles.tabText}
                        renderIcon={() => <Image style={styles.icon} source={require("./image/novel.png")} />}
                        selectedTitleStyle={styles.selectTab}
                        onPress={() => this.setState({selectedTab : '小说'})}
                    >
                        <NovelNavigator navigator={this.props.navigator} refresh={this.state.novelRefersh}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="视频"
                        selected={this.state.selectedTab=='视频'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectTab}
                        renderIcon={() => <Image style={styles.icon} source={require("./image/vedio.png")} />}
                        onPress={() => this.setState({selectedTab : '视频'})}
                    >
                        <VideoNavigator navigator={this.props.navigator} refresh={this.state.videoRefresh}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="电影"
                        selected={this.state.selectedTab=='电影'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectTab}
                        renderIcon={() => <Image style={styles.icon} source={require("./image/movie.png")} />}
                        onPress={() => this.setState({selectedTab : '电影'})}
                    >
                        <MovieNavigator navigator={this.props.navigator} refresh={this.state.movieRefresh}/>
                    </TabNavigator.Item>
                </TabNavigator>
                </SwipeRefreshLayoutAndroid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: "#000000",
        fontSize: 13
    },
    selectTab: {
        color: "#999999",
        fontSize: 13
    },
    icon: {
        width: 20,
        height: 20
    }
});
