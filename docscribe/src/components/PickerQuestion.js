import React, { Component } from 'react';
import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

class PickerQuestion extends Component {
    constructor() {
        super();
        this.state = {
            chosen: undefined,
            numbers: [
                {
                    label: '0',
                    value: 0,
                },
                {
                    label: '1',
                    value: 0,
                },
                {
                    label: '2',
                    value: 2,
                },
                {
                    label: '3',
                    value: 3,
                },
                {
                    label: '4',
                    value: 4,
                },
                {
                    label: '5 or more',
                    value: 5,
                },
            ],
        };
    }

    render() {
        return (
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{width: '50%'}}>
                    {this.props.question}
                </Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Select a number...',
                        value: null,
                    }}
                    items={this.state.numbers}
                    onValueChange={(value) => {
                        this.setState({
                            chosen: value,
                        });
                    }}
                    value={this.state.chosen}
                />
            </View>
        )
    }
}
export default PickerQuestion