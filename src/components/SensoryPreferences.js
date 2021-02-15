import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import '../index.css';
const SensoryPreferences = ({ data }) => {
    const [engagementPreference, setEngagementPreference] = useState('');
    const [memoryPreference, setMemoryPreference] = useState('');
    const [activityPreference, setActivityPreference] = useState('');
    const [lessonRetention, setLessonRetention] = useState('');
    const [newDevice, setNewDevice] = useState('');
    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     console.log()
    // })

    for (let i = 1; i < data.questions.length; i += 3) {
        let [
            engagementQuestions,
            memoryQuestions,
            activityPreference,
            lessonQuestions,
            newDeviceQuestions,
        ] = data.questions.slice(i, i + 3);

        console.log(engagementQuestions);
        console.log(memoryQuestions);
    }
    // const engagementQuestions = data.questions.splice(1, 3);
    // const memoryQuestions = data.questions.splice(1, 3);
    // const activityQuestions = data.questions.splice(1, 3);
    // const lessonQuestions = data.questions.splice(1, 3);
    // const newDeviceQuestions = data.questions.splice(1, 3);
    // console.log('engagement', engagementQuestions);
    // console.log('memory', memoryQuestions);

    return (
        <div>
            <h2 className="header">Sensory Preferences</h2>
            <Form className="form">
                <Form.Group>
                    <Form.Label as="legend">
                        1. I learn the most when the lesson engages my sense of{' '}
                        <em>sight</em>.
                    </Form.Label>
                    <Options questionType="engagement" />
                </Form.Group>
            </Form>
        </div>
    );
};

const Options = ({ questionType }) => {
    return (
        <>
            <Form.Check
                inline
                label="Strongly Disagree"
                type="radio"
                value={1}
                name={questionType}
                id={`${questionType} 1`}
                className="form-choices"
            />
            <Form.Check
                inline
                id={`${questionType} 2`}
                label="Disagree"
                name={questionType}
                type="radio"
                value={2}
                className="form-choices"
            />
            <Form.Check
                inline
                label="Neutral"
                id={`${questionType} 3`}
                name={questionType}
                name={questionType}
                type="radio"
                value={3}
                className="form-choices"
            />
            <Form.Check
                inline
                id={`${questionType} 4`}
                name={questionType}
                label="Agree"
                name={questionType}
                type="radio"
                value={4}
                className="form-choices"
            />
            <Form.Check
                inline
                label="Strongly Agree"
                id={`${questionType} 5`}
                name={questionType}
                type="radio"
                value={5}
                className="form-choices"
            />
        </>
    );
};

export default SensoryPreferences;
