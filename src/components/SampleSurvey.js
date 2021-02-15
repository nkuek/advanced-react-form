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
    useEffect(() => {
        console.log('reason', reason);
        console.log('plan', plan);
        console.log('whyOrWhyNot', whyOrWhyNot);
        console.log('firstName', firstName);
        console.log('email', email);
        console.log('additionalFeedback', addtionalFeedback);
    }, [reason, plan, whyOrWhyNot, firstName, email, addtionalFeedback]);
    return (
        <div>
            <h2 className="header">{data.name}</h2>
            <Form className="form">
                {data.questions.map((question, idx) => {
                    if (question.type === 'mcq') {
                        return (
                            <div>
                                <Form.Label htmlFor={idx} key={idx}>
                                    {question.stem}
                                    {question.options.map((option) => (
                                        <Form.Check
                                            key={option.value}
                                            label={option.text}
                                            type="radio"
                                            id={idx}
                                            value={option.value}
                                            name={question}
                                            onChange={(e) =>
                                                question.stem.includes('reason')
                                                    ? setReason(e.target.value)
                                                    : setPlan(e.target.value)
                                            }
                                        />
                                    ))}
                                </Form.Label>
                            </div>
                        );
                    } else if (question.type === 'cr') {
                        return (
                            <Form.Group key={idx}>
                                <Form.Label>{question.stem}</Form.Label>
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
                            </Form.Group>
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
