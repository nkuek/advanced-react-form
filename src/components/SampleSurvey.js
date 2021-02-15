import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, Fragment } from 'react';

const SampleSurvey = ({ data }) => {
    const [reason, setReason] = useState('');
    const [plan, setPlan] = useState('');
    const [whyOrWhyNot, setWhyOrWhyNot] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [addtionalFeedback, setAdditionalFeedback] = useState('');
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        console.log('reason', reason);
        console.log('plan', plan);
        const errors = [];
        if (!reason || !plan)
            errors.push('Please fill out all required fields');
    }, [reason, plan, whyOrWhyNot, firstName, email, addtionalFeedback]);
    return (
        <div>
            <h2 className="header">{data.name}</h2>
            <Form className="form">
                {data.questions.map((question, idx) => {
                    if (question.type === 'mcq') {
                        return (
                            <div className="mb-3" key={idx}>
                                <Form.Label as="legend" column sm={2}>
                                    {question.stem}
                                </Form.Label>
                                {question.options.map((option, i) => (
                                    <Form.Col sm={10}>
                                        <Form.Check
                                            key={i}
                                            label={option.text}
                                            id={idx}
                                            type="radio"
                                            value={option.value}
                                            name={idx}
                                            onChange={(e) =>
                                                question.stem.includes('reason')
                                                    ? setReason(e.target.value)
                                                    : setPlan(e.target.value)
                                            }
                                        />
                                    </Form.Col>
                                ))}
                            </div>
                        );
                    } else if (question.type === 'cr') {
                        return (
                            <div className="mb-3" key={idx}>
                                <Form.Label as="legend" column sm={2}>
                                    {question.stem}
                                </Form.Label>
                                <Form.Control
                                    onChange={(e) =>
                                        question.stem.includes('Why')
                                            ? setWhyOrWhyNot(e.target.value)
                                            : question.stem.includes('name')
                                            ? setFirstName(e.target.value)
                                            : question.stem.includes('email')
                                            ? setEmail(e.target.value)
                                            : setAdditionalFeedback(
                                                  e.target.value
                                              )
                                    }
                                    placeholder={
                                        question.instructions
                                            ? question.instructions
                                            : ''
                                    }
                                    as={
                                        question.lines > 1
                                            ? 'textarea'
                                            : 'input'
                                    }
                                    rows={question.lines}
                                    required={!question.optional}
                                ></Form.Control>
                            </div>
                        );
                    } else {
                        return (
                            <Fragment key={idx}>
                                <hr className="separator"></hr>
                                <h3 className="header">{question.title}</h3>
                                <pre className="subheader">
                                    {question.instructions}
                                </pre>
                            </Fragment>
                        );
                    }
                })}
                <Button as="input" type="submit" value="Submit"></Button>
            </Form>
        </div>
    );
};

export default SampleSurvey;
