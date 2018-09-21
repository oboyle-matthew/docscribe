import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';

export default class TextQuestion extends React.Component {

    constructor() {
        super();
        this.state = {
            answer: ''
        }
    }

    render() {
        const { question } = this.props;
        const { answer } = this.state;
        return (
            <View>
                <Text>{question}</Text>
                <TextInput
                    style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(newText) => this.setState({answer: newText})}
                    placeholder={"Input your answer here"}
                    value={answer}
                />
            </View>
        );
    }
}

TextQuestion.propTypes = {
    question: PropTypes.string
}