import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Slider } from 'react-native';

export default class SliderQuestion extends React.Component {

    constructor() {
        super();
        this.state = {
            answer: -1
        }
    }

    componentDidMount() {
        const { max, min } = this.props;
        this.setState({
            answer: (max + min) / 2
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
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{width: 100, height: 100, textAlign: 'left'}}>{this.props.minLabel}</Text>
                    <Text style={{width: 100, height: 100, textAlign: 'center'}}>{answer}</Text>
                    <Text style={{width: 100, height: 100, textAlign: 'right'}}>{this.props.maxLabel}</Text>
                </View>
            </View>
        );
    }
}

SliderQuestion.propTypes = {
    question: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    minLabel: PropTypes.string,
    maxLabel: PropTypes.string
};