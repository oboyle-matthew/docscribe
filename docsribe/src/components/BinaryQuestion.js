import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class BinaryQuestion extends React.Component {

    constructor() {
        super();
        this.state = {
            oneChecked: false,
            twoChecked: false
        }
    }

    checkOne = () => {
        if (!this.state.oneChecked && this.state.twoChecked) {
            this.setState({
                twoChecked: false
            })
        }
        this.setState({
            oneChecked: !this.state.oneChecked,
        })
    };

    checkTwo = () => {
        if (!this.state.twoChecked && this.state.oneChecked) {
            this.setState({
                oneChecked: false
            })
        }
        this.setState({
            twoChecked: !this.state.twoChecked,
        })
    };

    render() {
        const { question } = this.props;
        return (
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{width: '40%', textAlign: 'center'}}>{question}</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <CheckBox
                        title={this.props.optionOne}
                        checked={this.state.oneChecked}
                        onPress={this.checkOne}
                    />
                    <CheckBox
                        title={this.props.optionTwo}
                        checked={this.state.twoChecked}
                        onPress={this.checkTwo}
                    />
                </View>

            </View>
        );
    }
}

BinaryQuestion.propTypes = {
    question: PropTypes.string
}