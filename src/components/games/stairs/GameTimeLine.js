import React, {Component} from 'react';
import { Timeline, Icon, Popover, Divider } from 'antd';

class GameTimeLine extends Component{

    constructor(props){
        super(props);
        let date = new Date();
        this.state = {
            timeLine: [<Timeline.Item key={1} order="descend" color={(date.getSeconds()%2 ===0) ? "red" : "green"} dot={<Icon type={(date.getSeconds()%2 ===0) ? "close" : "check"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={2} order="descend" color={"green"} dot={<Icon type={"check"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={3}  order="descend" color={ "red"} dot={<Icon type={"close"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={5} order="descend" color={"red" } dot={<Icon type={"close"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={6} order="descend" color={"green"} dot={<Icon type={"check"} style={{ fontSize: '16px' }} />}>
                    <Popover content={"Technical testing " + date.toTimeString()} title={ <Icon type={"check"} style={{ fontSize: '16px' }} /> }>
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={7} order="descend" color={(date.getSeconds()%2 ===0) ? "red" : "green"} dot={<Icon type={(date.getSeconds()%2 ===0) ? "close" : "check"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={8} order="descend" color={(date.getSeconds()%2 ===0) ? "red" : "green"} dot={<Icon type={(date.getSeconds()%2 ===0) ? "close" : "check"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={9} order="descend" color={(date.getSeconds()%2 ===0) ? "red" : "green"} dot={<Icon type={(date.getSeconds()%2 ===0) ? "close" : "check"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>,
                <Timeline.Item key={10} order="descend" color={(date.getSeconds()%2 ===0) ? "red" : "green"} dot={<Icon type={(date.getSeconds()%2 ===0) ? "close" : "check"} style={{ fontSize: '16px' }} />}>
                <Popover content={"Technical testing " + date.toTimeString()} title="Title">
                    Technical testing {date.toTimeString()}
                </Popover>
            </Timeline.Item>]
        }
    }



    render(){
        return (
            <div className={"stairs-time-line"}>

                <Divider orientation="left">Games Live</Divider>
                <Timeline pending="Loading..." >
                    {this.state.timeLine}
                </Timeline>
            </div>
        );
    }
}

export default GameTimeLine