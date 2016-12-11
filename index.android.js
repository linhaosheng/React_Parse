/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    BackAndroid,
    ToastAndroid
} from 'react-native';
import React, {Component} from 'react';
import FirstView from './FirstView';
export default class React_Parse extends Component {
    
    render() {
        let defaultName = 'FirstView';
        let defaultComponent = FirstView;
        let url = '';
        return (
            <Navigator
                initialRoute={{name:defaultName,component:defaultComponent,url:url}}
                configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
                renderScene={(route,navigator)=>{
            let Component = route.component;
            return <Component {...route.params} navigator={navigator}/>
            }
          }
            />
        )}
}
AppRegistry.registerComponent('React_Parse', () => React_Parse);
