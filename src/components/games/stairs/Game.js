import React, { Component } from 'react';
import { Row, Col, Table, Button, Icon, Select, Input, Radio, notification, Divider, Alert } from 'antd';
import {  Translate, getTranslate  } from 'react-localize-redux';
import {connect} from "react-redux";

const Option = Select.Option;
class Game extends Component  {


    constructor(props){
        super(props);

        let buttons = {};
        let rows = {};
        for (let i = 0; i< 10; i++) {
            buttons[i] = {};
            rows[i] = false;
            for(let j = 0; j <= 2; j++){
                buttons[i][j] = {
                    loading : false,
                    icon: "question-circle-o",
                    type: "dashed"
                };
            }
        }
        rows[0] = true;
        this.state= {
            buttons,
            rows,
            modal:false,
            loading:false,
            difficulty:"easy"
        }

    }




    componentDidMount(){
        this.noticeDemo("warning");
    }

    noticeDemo = (type) => {
            notification[type]({
                message: this.props.translate("Attention!"),
                description: this.props.translate('The game is in development, all bets and winnings are made by test money.'),
            })
    };


    onBtnClick = (i,j) =>{
        let buttons = this.state.buttons;
        let rows = this.state.rows;
        buttons[i][j].loading = true;
        this.setState({
            buttons,
            loading:true
        });

        setTimeout( () =>{
            rows[i+1] = true;
            buttons[i][0]= {
                loading:false,
                icon: "close",
                type: "danger"
            };
            buttons[i][1]= {
                loading:false,
                icon: "close",
                type: "danger"
            };
            buttons[i][2]= {
                loading:false,
                icon: "close",
                type: "danger"
            };
            buttons[i][j]= {
                loading:false,
                icon: "check-circle-o",
                type: "primary"
            };
            this.setState({
                buttons,
                rows,
                loading:false
            })
        }, 1500)
    };

    changeDifficulty = (difficulty) =>{
        this.setState({
            difficulty: difficulty.target.value
        })
    };

    render() {
        const dataSource = [];


        let columns = [];


        columns[0] = {
            title: <span style={{fontSize:"22px", display:"block", textAlign:"center", color:"#804e80"}}><Icon type={"wallet"}/> $100</span>,
            dataIndex: '0',
            key: '0',
        };
        columns[1] = {

            dataIndex: '1',
            key: '1',
        };
        columns[2] = {
            title:
                <Select defaultValue="bits" style={{ width: "100%" }}>
                    <Option value="$">$</Option>
                    <Option value="satoshi">satoshi</Option>
                    <Option value="bits">bits</Option>
                    <Option value="mBTC">mBTC</Option>
                    <Option value="BTC">BTC</Option>
                </Select>,
            dataIndex: '2',
            key: '2',
        };
        if(this.state.difficulty === "medium"){
            columns[1].title = columns[2].title;
            columns.splice(2,1)
        }
        
        for (let i = 0; i< 10; i++) {
            dataSource[i] = {
                key: i,
            };

            for(let j = 0; j <= columns.length - 1; j++){
                dataSource[i][j] = <Button size={"default"} disabled={!this.state.rows[i]} type={this.state.buttons[i][j].type} icon={this.state.buttons[i][j].icon} onClick={() => this.onBtnClick(i,j)} loading={this.state.buttons[i][j].loading} style={{width: "100%"}}>Check</Button>;
            }
        }
        dataSource.reverse();




        const footer = <Row gutter={8} >
            <Col span={24} className={"center-text stairs-type"}>
                <Radio.Group value={this.state.difficulty}  style={{ marginBottom: 16}} onChange={(val) =>this.changeDifficulty(val)}>
                    <Radio.Button value="easy"> {(this.state.difficulty === "easy") ? <Icon type="check-circle-o" /> : null} <Translate id={"Easy"}/></Radio.Button>
                    <Radio.Button value="medium"> {(this.state.difficulty === "medium") ? <Icon type="check-circle-o" /> : null} <Translate id={"Medium"}/></Radio.Button>
                    <Radio.Button value="hard"> {(this.state.difficulty === "hard") ? <Icon type="check-circle-o" /> : null} <Translate id={"Hard"}/></Radio.Button>
                </Radio.Group>
            </Col>
            <Col span={24}>
                <Button style={{width:"100%", marginBottom:10}} size={"large"} type={"primary"}><Translate id={"Demo Game"}/></Button>
            </Col>

            <Col span={8}>
                <Button type={"primary"}><Icon type="minus-circle-o" /></Button>
            </Col>
            <Col span={8}>
                <Input addonBefore={"$"} min={1} max={10} defaultValue={3} style={{width: "100%"}}/>
            </Col>
            <Col span={8} style={{textAlign:"right"}}>
                <Button type={"primary"}><Icon type="plus-circle-o" /></Button>
            </Col>
            <Col span={24}>
                <Button style={{width:"100%", marginTop:10}} size={"small"} type={"success"}><Translate id={"Check Ticket"}/></Button>
            </Col>

        </Row>;

        return (
            <div  className={"difficulty-" + this.state.difficulty}>
                <Table  style={{width: "100%"}} defaultSortOrder={"descend"} sorter={true} dataSource={dataSource} columns={columns} pagination={false}  loading={this.state.loading} size={"small"} footer={() => footer} />
                <Alert
                    message="Next Ticket"
                    description= {<p>hash: fsdsfdg64srf84rdg5er1f98er1v98er1fer51ver1<br/> word: dfg64fg</p>}
                    type="info"
                    style={{marginTop:10, marginBottom:10}}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        appState: state,
        translate: getTranslate(state.locale)
    }),
    dispatch => ({

    })
)(Game);