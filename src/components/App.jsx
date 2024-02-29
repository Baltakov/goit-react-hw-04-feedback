import React, { Component } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = name => {
    this.setState(prevState => ({ [name]: prevState[name] + 1 }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return total;
  };

  countPositiveFeedbackPercentage = () =>
    Math.round((this.state.good / this.countTotalFeedback()) * 100 || 0);

  render() {
    const { good, neutral, bad } = this.state;
    const options = ['good', 'neutral', 'bad'];

    return (
      <div>
        <Section
          title="Please leave feedback"
          children={
            <FeedbackOptions
              options={options}
              onLeaveFeedback={this.handleClick}
            />
          }
        />
        <Section
          title="Statistics"
          children={
            this.countTotalFeedback() ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countTotalFeedback()}
                positivePercentage={this.countPositiveFeedbackPercentage()}
              />
            ) : (
              <Notification message={'There is no feedback'} />
            )
          }
        />
      </div>
    );
  }
}
