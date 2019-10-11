import React, {Component} from 'react';
import { List, Switch } from 'antd';

class OtherSwitch extends Component {
    switchChange = (key, val) => {
        const { switchToggle } = this.props;
        let _val = '';
        val == 1 ? _val = 2 : _val = 1;
        switchToggle(key, _val)
    };
    render() {
        const { switchData } = this.props;
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={switchData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                className='switch-item'
                                title={item.title}
                                description={<Switch defaultChecked={ item.val == 1 ? true : false } onChange={ () => this.switchChange(item.key, item.val) } />}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default OtherSwitch;