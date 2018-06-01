import React, {Component} from 'react';
import { Tabs, Table, Icon  } from 'antd';
const TabPane = Tabs.TabPane;

class HeroesWall extends  Component {



    render(){
        const columns = [{
            title: <Icon type="line-chart" />,
            dataIndex: 'position',
        },{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Sum',
            dataIndex: 'sum',
        }];
        const data = [{
            key: '1',
            position: 1,
            name: 'John Brown',
            sum: 32,
        }, {
            key: '2',
            position: 2,
            name: 'Jim Green',
            sum: 42,
        }, {
            key: '3',
            position: 3,
            name: 'Joe Black',
            sum: 32,
        }, {
            key: '4',
            position: 4,
            name: 'Joe Black',
            sum: 32,
        }, {
            key: '5',
            position: 5,
            name: 'Joe Black',
            sum: 32,
        }, {
            key: '6',
            position: 6,
            name: 'Joe Black',
            sum: 32,
        }, {
            key: '7',
            position: 7,
            name: 'Joe Black',
            sum: 32,
        }, {
            key: '8',
            position: 8,
            name: 'Joe Black',
            sum: 32,
        }];
        return(
            <div className={"heroes-wall"}>
                <Tabs style={{width:"100%"}}>
                    <TabPane tab={<span><Icon type="calendar" />This week</span>} key="week">
                        <Table columns={columns} dataSource={data}  pagination={false} style={{width:"100%"}} size={"small"}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="calendar" />Month</span>} key="month">
                        <Table columns={columns} dataSource={data}  pagination={false} style={{width:"100%"}} size={"small"}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default HeroesWall