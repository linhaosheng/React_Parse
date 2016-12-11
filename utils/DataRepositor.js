/**
 * Created by linhao on 2016/11/20.
 */
'use strict';
import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';

var BASE_URL = 'http://192.168.1.108:3001';
var PICTURE = '/picture';
var NOVEL = '/novel';
var VEDIO = '/vedio';
var MOVIE = '/movie';
var QUERY_PICTURE = '/queryPicture';
var QUERY_NOVEL = '/queryNovel';
var QUERY_VIDEO = '/queryVedio';
var QUERY_MOVIE = '/queryMovie'

export default class DataRepositor {
    /**
     * 获取图片
     * @returns {Promise}
     */
    getPicture(picNum:Number, pageNum:Number) {
        console.log('getPicture : ' + BASE_URL + PICTURE);
        return new Promise((resolve, reject) => {
            fetch(BASE_URL + PICTURE + '?pageNum=' + pageNum + '&picNum=' + picNum)
                .then((response) =>response.json())
                .then((responseData) => {
                    console.log('getPicture json' + responseData);
                    resolve(responseData)
                }).catch((error) => {
                console.log('getPicture error' + error);
                resolve(error);
            });
        });
    }

    /**
     *  获取小说
     * @returns {Promise}
     */
    getNovel(novelNum:Number, pageNum:Number) {
        console.log('getNovel : ' + BASE_URL + NOVEL);
        return new Promise((resolve, reject) => {
            fetch(BASE_URL + NOVEL + '?pageNum=' + pageNum + '&novelNum=' + novelNum)
                .then((response) =>response.json())
                .then((responseData) => {
                    console.log('getNovel json' + responseData);
                    resolve(responseData);
                }).catch((error) => {
                console.log('getNovel error' + error);
                resolve(error);
            });
        });
    }

    /**
     * 获取视频
     * @returns {Promise}
     */
    getVedio(vedioNum:Number, pageNum:Number, classify:String) {
        console.log('getVedio : ' + BASE_URL + VEDIO);
        return new Promise((resolve, reject) => {
            fetch(BASE_URL + VEDIO + '?pageNum=' + pageNum + '&vedioNum=' + vedioNum + '&classify=' + classify)
                .then((response) =>response.json())
                .then((responseData) => {
                    console.log('getVedio json' + responseData);
                    resolve(responseData);
                }).catch((error) => {
                console.log('getVedio error' + error);
                resolve(error);
            });
        });
    }

    /**
     * 获取电影
     * @returns {Promise}
     */
    getMovie(movieNum:Number, pageNum:Number) {
        console.log('getVedio : ' + BASE_URL + MOVIE);
        return new Promise((resolve, reject) => {
            fetch(BASE_URL + MOVIE + '?movieNum=' + movieNum + '&pageNum=' + pageNum)
                .then((response) =>response.json())
                .then((responseData) => {
                    console.log('getMovie json' + responseData);
                    resolve(responseData);
                }).catch((error) => {
                console.log('getMovie error' + error);
                resolve(error);
            });
        });
    }

    /**
     * 查找图片
     * @param picNum 图片的类型  ：1
     * @param pageNum 图片的编码 ： 100936
     * @returns {Promise}
     */
    queryPicture(picNum:Number, pageNum:Number) {
        return new Promise((resolve, reject) => {
            fetch(BASE_URL + QUERY_PICTURE + '?picNum=' + picNum + '&pageNum=' + pageNum)
                .then((response)=>response.json())
                .then((responseData)=> {
                    console.log('queryPicture json ' + responseData);
                    resolve(responseData);
                }).catch((error) => {
                console.log('queryPicture error ' + error);
                resolve(error);
            });
        });
    }

    /**
     * 查找小说
     * @param novelNum 小说的类型  ：1
     * @param pageNum  小说的编号  : 33007
     * @returns {Promise}
     */
    queryNovel(novelNum:Number, pageNum:Number) {
        return new Promise((resolve, reject)=> {
            fetch(BASE_URL + QUERY_NOVEL + '?novelNum=' + novelNum + '&pageNum=' + pageNum)
                .then((response)=>response.json())
                .then((responseData)=> {
                    console.log('queryNovel json ' + responseData);
                    resolve(responseData);
                }).catch((error) => {
                console.log('queryNovel error ' + error);
                resolve(error);
            });
        });
    }

    /**
     * 查找视频
     * @param classify  : dylist , vodlist
     * @param vedioNum : dylist {1 :视频偷拍 3 ：欧美电影} vodlist: {1: 网友自拍 2 ：亚洲视频 3 ：欧美视频 4 ： 动漫视频 5
     * @param pageNum  :  视频当前页码
     * @returns {Promise}
     */
    queryVideo(classify:String, vedioNum:Number, pageNum:Number) {
        return new Promise((resolve, reject)=> {
            fetch(BASE_URL + QUERY_VIDEO + '?classify=' + classify + '&vedioNum=' + vedioNum + '&pageNum=' + pageNum)
                .then((response) =>response.json())
                .then((responseData) => {
                    console.log('queryNovel json ' + responseData);
                    resolve(responseData);
                }).catch((error) => {
                console.log('queryNovel error ' + error);
                resolve(error);
            });
        });
    }

    /**
     * 查询电影
     * @param movieNum  : 1 : 中文无码 2 ：中文有码 3：欧美无码 4 ：韩国无码 5 ：日本无码 6 ：日本有码 7 ：偷拍自拍
     * @param pageNum  :  电影当前页码
     * @returns {Promise}
     */
    queryMovie(movieNum:Number, pageNum:Number) {
        return new Promise((resolve, reject)=> {
            fetch(BASE_URL + QUERY_MOVIE + '?movieNum=' + movieNum + '&pageNum=' + pageNum)
                .then((response) =>response.json())
                .then((responseData) => {
                    console.log('queryMovie json ' + responseData);
                    resolve(responseData);
                }).catch((error) => {
                console.log('queryMovie error ' + error);
                resolve(error);
            })
        })
    }
}
