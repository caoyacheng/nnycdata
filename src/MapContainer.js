"use client"
import React, { Component } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import './MapContainer.css';

class MapComponent extends Component {
    constructor() {
        super();
        // this.state = {
        //     map:{}
        // };       
        this.map = {};

    }
    // 2.dom渲染成功后进行map对象的创建
    componentDidMount() {
        AMapLoader.load({
            key: '03ca83e8383c78db43dcc12c2eec3e29', //需要设置您申请的key
            version: "2.0",
            plugins: ['AMap.ToolBar', 'AMap.Driving'],
            AMapUI: {
                version: "1.1",
                plugins: [],

            },
            Loca: {
                version: "2.0.0"
            },
        }).then((AMap) => {
            this.map = new AMap.Map("mapcontainer", {
                viewMode: "3D",
                zoom: 15,
                zooms: [2, 22],
                pitch: 55,
                center: [108.336646, 22.813143],
            });
            let positionArr = [
                [113.357224, 34.977186],
                [114.555528, 37.727903],
                [112.106257, 36.962733],
                [109.830097, 31.859027],
                [116.449181, 39.98614],
            ];
            for (let item of positionArr) {
                let marker = new AMap.Marker({
                    position: [item[0], item[1]],
                });
                this.map.add(marker);
            }

            //添加烟草区域
            const pathArr = [
                [
                    [
                        [108.336389, 22.812905],
                        [108.347375, 22.812826],
                        [108.355271, 22.812193],
                        [108.349692, 22.807446],
                        [108.339135, 22.801591],
                        [108.33656, 22.80618],
                        [108.336389, 22.812905],
                    ],
                ],
            ];

            const polygon = new AMap.Polygon({
                path: pathArr, //多边形路径
                fillColor: "#E75030", //多边形填充颜色
                strokeOpacity: 1, //线条透明度
                fillOpacity: 0.5, //填充透明度
                strokeColor: "#2b8cbe", //线条颜色
                strokeWeight: 1, //线条宽度
                strokeStyle: "dashed", //线样式
                strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
            });

            this.map.add(polygon);

            //叠加热力图
            // loca热力图
            const Loca = window.Loca;
            this.loca = new Loca.Container({
                map: this.map
            });

            // 创建圆点图层
            var pointLayer = new Loca.PointLayer({
                zIndex: 10,
                opacity: 1,
                visible: true,
                blend: 'lighter',
            });
            // 创建数据源
            var dataSource = new Loca.GeoJSONSource({
                // url: 'xxx.geojson', 或者使用 data 字段
                data: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    108.342704, 22.809005
                                ]
                            }
                        }
                    ]
                },
            });
            // 图层添加数据
            pointLayer.setSource(dataSource);
            // 设置样式
            pointLayer.setStyle({
                radius: 30,
                color: 'red',
                borderWidth: 10,
                borderColor: '#fff',
                unit: 'px',
            })
            // 添加到地图上
            this.loca.add(pointLayer);



        }).catch(e => {
            console.log(e);
        })
    }
    render() {
        // 1.创建地图容器
        return (
            <div className="home_div">
                <div className="map-title">
                    <h3>南宁烟草区域销售情况</h3>
                </div>
                <div id="mapcontainer" className="map" style={{ height: '100%' }} />
            </div>
        );
    }

}
export default MapComponent;


