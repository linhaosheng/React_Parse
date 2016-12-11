/**
 * Created by linhao on 2016/12/4.
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
    WebView,
    ToastAndroid
} from 'react-native'
import React,{Component} from 'react';
import DataRepositor from '../utils/DataRepositor';

export default class NovelView extends Component {
    // 构造
      constructor(props) {
        super(props);
          this.respositor = new DataRepositor();
        // 初始状态
        this.state = {
            data : {
                content:''
            },
            error:''
        };
      }
    getData(){
        this.respositor.queryNovel(this.props.selectNovel,this.props.pageNum)
            .then((responseData) =>{
              this.setState({
                  data:{
                      content:responseData[0].content
                  }
              });
            }).catch((error) =>{
            this.setState({
                error:error
            })
        }).done();
    }
    componentDidMount() {
       this.getData();
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
    render(){
        return(
            <View  style={style.container}>
                <Text style={style.titleStyle}>
                    {this.props.title}
                </Text>
                 <WebView
                    style={style.webviewStyle}
                    source={{html:this.state.data.content}}
                    automaticallyAdjustContentInsets={true}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}/>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container :{
        flex : 1,
        flexDirection : 'column',
    },
    titleStyle :{
        fontSize : 20,
        color : 'black',
        marginTop:20,
        marginLeft:30
    },
    webviewStyle :{
        marginLeft:10,
        marginRight:10,
        marginBottom : 20
    }
})