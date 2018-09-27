import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';

export default class TextQuestion extends React.Component {

    constructor() {
        super();
        this.state = {
            answer: '',
            mostRecent: ''
        }
    }

    textChange = (newText) => {
        this.setState({answer: newText});
        this.setState({mostRecent: newText});
    }

    render() {
        const { question } = this.props;
        const { answer } = this.state;
        return (
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{width: '40%'}}>{question}</Text>
                <TextInput
                    multiline
                    blurOnSubmit
                    style={{borderColor: 'gray', borderWidth: 1, height: '100%', width: '50%'}}
                    onChangeText={(newText) => this.textChange}
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