// import { Component } from "react";
import { useState } from "react";
import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { NotificationMessage } from "./Notification/Notification";

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = event => {
    const feedback = event.target.name;
    switch (feedback) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (!countTotalFeedback()) {
      return;
    }
    return Math.round((good / countTotalFeedback()) * 100)
  };

  const options = Object.keys({ good, neutral, bad });
  
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleIncrement}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ?
          (<Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />) : (<NotificationMessage message="There is no feedback" />)}
      </Section>
    </>
  )
};

