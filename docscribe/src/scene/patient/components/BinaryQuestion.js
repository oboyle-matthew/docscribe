import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class BinaryQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneChecked: this.props.app.object[this.props.objectKey] === true,
            twoChecked: this.props.app.object[this.props.objectKey] === false,
        };
    }

    checkOne = () => {
        if (this.state.oneChecked) {
            this.props.app.object[this.props.objectKey] = null;
            this.props.onValueChanged && this.props.onValueChanged(null);
        } else {
            this.props.app.object[this.props.objectKey] = true;
            this.props.onValueChanged && this.props.onValueChanged(true);
        }
        const { oneChecked, twoChecked } = this.state;
        if (!oneChecked && twoChecked) {
            this.setState({
                twoChecked: false,
            });
        }
        this.setState({
            oneChecked: !oneChecked,
        });
    };

    checkTwo = () => {
        if (this.state.twoChecked) {
            this.props.app.object[this.props.objectKey] = null;
            this.props.onValueChanged && this.props.onValueChanged(null);
        } else {
            this.props.app.object[this.props.objectKey] = false;
            this.props.onValueChanged && this.props.onValueChanged(false);
        }
        const { oneChecked, twoChecked } = this.state;
        if (!twoChecked && oneChecked) {
            this.setState({
                oneChecked: false,
            });
        }
        this.setState({
            twoChecked: !twoChecked,
        });
    };

    render() {
        const { question, optionOne, optionTwo } = this.props;
        const { oneChecked, twoChecked } = this.state;
        return (
            <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Text style={{ width: 100, textAlign: 'center' }}>{question}</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CheckBox title={optionOne} checked={oneChecked} onPress={this.checkOne} />
                    <CheckBox title={optionTwo} checked={twoChecked} onPress={this.checkTwo} />
                </View>
            </View>
        );
    }
}

BinaryQuestion.propTypes = {
    question: PropTypes.string.isRequired,
    optionOne: PropTypes.string.isRequired,
    optionTwo: PropTypes.string.isRequired,
};
