import React, { Component } from 'react';
import { Picker, Button, View } from 'react-native'

class PickerQuestion extends Component {
    constructor() {
        super();
        this.state = {
            showPicker: false
        }
    }

    handleCancel() {
        this.setState({
            showPicker: false
        })
    }

    render() {
        return (
            <View style={{width: '50%'}}>
                {this.state.showPicker ?
                    <View>
                        <Picker style={{backgroundColor: '#77aaff'}}
                                onValueChange={(lang) => this.setState({language: lang})}>
                            <Picker.Item label="0" value={0} />
                            <Picker.Item label="1" value={1} />
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                            <Picker.Item label="5 or more" value={5} />

                        </Picker>
                        <Button style={{width: '50%'}}
                                title={"Cancel"}
                                onPress={(e) => this.setState({showPicker: false})}
                        />
                    </View>
                    :
                    <Button style={{width: '50%'}}
                            title={"Choose a number"}
                            onPress={(e) => this.setState({showPicker: true})}
                    />}
            </View>
        )
    }
}
export default PickerQuestion