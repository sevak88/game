import React, {Component} from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;

class DepositForm extends Component{


    render(){
        const selectAfter = (
            <Select defaultValue="bits" style={{ width: 80 }}>
                <Option value="$">$</Option>
                <Option value="satoshi">satoshi</Option>
                <Option value="bits">bits</Option>
                <Option value="mBTC">mBTC</Option>
                <Option value="BTC">BTC</Option>
            </Select>
        );


        return (
            <div>
                <p>Get money for free, every 15 minutes</p>
                <div style={{ marginBottom: 16 }}>
                    <Input addonAfter={selectAfter}  />
                </div>
            </div>
        )
    }
}
export default DepositForm