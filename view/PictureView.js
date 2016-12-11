/**
 * Created by linhao on 2016/12/3.
 */
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ListView,
    TouchableHighlight,
    Image,
    Navigator,
    BackAndroid,
    ToastAndroid
} from 'react-native'
import React,{Component} from 'react';
import DataRepositor from '../utils/DataRepositor';

export default class PictureView extends Component{
    // 构造
    constructor(props) {
        super(props);
        this.repositor =new DataRepositor();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        // 初始状态
        this.state = {
            load:false,
            error : '',
            dataSource : ds
        };
    }

    componentWillMount() {
        this.getData();
    }
    componentDidMount() {
        var {navigator} = this.props;
      BackAndroid.addEventListener('hardwareBackPress',function () {
            if(navigator == null){
                return false;
            }
            if(navigator.getCurrentRoutes().length === 1){
                return false;
            }
          navigator.pop();
            return true;
        });
    }
    getData() {
        this.repositor.queryPicture(this.props.select,this.props.pageNum).then((responseData) =>{
            this.setState({
                load:true,
                dataSource : this.state.dataSource.cloneWithRows(responseData),
                error:''
            })
        }).catch((error) =>{
            this.setState({
              error:error
            })
        }).done();
    }
    _rendRow(dataSource){
        return(
            <TouchableHighlight underlayColor='rgba(24,36,35,0.1)'>
                <View style={style.itemContainer}>
                    <Image source={{uri:dataSource.img}}
                           style={style.imageStyle}>
                    </Image>
                </View>
            </TouchableHighlight>
        )
    }
    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View key={`{sectionID}-${rowID}`}
                  style={{height: 1, backgroundColor: 'black'}}>
            </View>
        );
    }
    render(){
        return(
            <View style={style.contain}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._rendRow.bind(this)}
                    renderSeparator={this._renderSeparator}
                    enableEmptySections={true}
                />
            </View>
        )
    }
}
const style = StyleSheet.create({
    container :{
        flex : 1
    },
    itemContainer: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop:10
    },
    imageStyle: {
        height:300
    }
})