import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Slider } from 'react-native';

export default class TextQuestion extends React.Component {

    constructor() {
        super();
        this.state = {
            answer: 0
        }
    }

    componentDidMount() {
        const { min } = this.props;
        this.setState({
            answer: min
        });
    }

    render() {
        const { question, min, max, step } = this.props;
        const { answer } = this.state;

        return (
            <View>
                <Text>{question}</Text>
                <Slider
                    step={step}
                    minimumValue={min}
                    maximumValue={max}
                    onValueChange={(value) => this.setState({answer: value})}
                    value={answer}
                />
                <Text>{answer}</Text>
            </View>
        );
    }
}

TextQuestion.propTypes = {
    question: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
};