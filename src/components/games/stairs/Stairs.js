import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import Game from "./Game";
import GameTimeLine from "./GameTimeLine";
import HeroesWall from "./HeroesWall";
import {connect} from "react-redux";

class Stairs extends Component {

    render() {
        return (
            <div>
                <Row >

                        <Col xl={8} md={7} xs={0}>
                            <GameTimeLine/>
                        </Col>
                        <Col xl={8} md={10}>
                            <div className={"game-stairs"}>
                                <div style={{width:"100%", marginTop:20, marginBottom:20}} >
                                </div>
                                <Game/>
                            </div>
                        </Col>
                        <Col xl={8} md={7} xs={0}>
                            <HeroesWall/>
                        </Col>

                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({
        appState: state
    }),
    dispatch => ({

    })
)(Stairs);