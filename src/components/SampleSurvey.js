import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, Fragment } from 'react';

const SampleSurvey = ({ data }) => {
    // Set Form States
    const [reason, setReason] = useState('');
    const [plan, setPlan] = useState('');
    const [whyOrWhyNot, setWhyOrWhyNot] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [addtionalFeedback, setAdditionalFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    // Creation of form submission event handler
    const onSubmit = (e) => {
        e.preventDefault();

        // Will scroll back to the top of the page if there are errors
        window.scrollTo(0, 0);

        // Form validation
        const errors = [];
        if (!reason || !plan)
            errors.push('Please fill out all required fields');
        if (whyOrWhyNot.length === 0)
            errors.push('Please answer why or why not');
        setErrors(errors);

        // Set isSubmitted state to true if there are no errors
        if (errors.length === 0) setIsSubmitted(true);
    };

    // Renders thank you message instead of the form if it is submitted without errors
    if (isSubmitted) return <h2 className="header">{data.thankyou}</h2>;

    // Render Form
    return (
        <div>
            <h2 className="header">{data.name}</h2>
            <Form className="form" onSubmit={onSubmit}>
                {/* If there are any errors, render list of errors */}
                <ul className="errors">
                    {errors &&
                        errors.map((error, idx) => {
                            return <li key={idx}>{error}</li>;
                        })}
                </ul>
                {/* Render mcq as radio button questions */}
                {data.questions.map((question, idx) => {
                    if (question.type === 'mcq') {
                        return (
                            <div className="mb-3" key={idx}>
                                <Form.Label as="legend">
                                    {question.stem} *
                                </Form.Label>

                                {/* Creation of form elements for every question in the sample json */}
                                {question.options.map((option, i) => (
                                    <Form.Check
                                        key={i}
                                        label={option.text}
                                        id={idx}
                                        type="radio"
                                        value={option.value}
                                        name={idx}
                                        // Conditional event listener for react state depending on the question
                                        onChange={(e) =>
                                            question.stem.includes('reason')
                                                ? setReason(e.target.value)
                                                : setPlan(e.target.value)
                                        }
                                    />
                                ))}
                            </div>
                        );
                    }
                    // Render cr questions
                    else if (question.type === 'cr') {
                        return (
                            <div className="mb-3" key={idx}>
                                <Form.Label as="legend">
                                    {question.stem}
                                </Form.Label>
                                <Form.Control
                                    // Set various react state to the input value depending on question
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
                                    // If question has instructions, renders them as placeholder text
                                    placeholder={
                                        question.instructions
                                            ? question.instructions
                                            : ''
                                    }
                                    // If the question specifies lines > 1, renders as textarea
                                    // else renders as plain input field
                                    as={
                                        question.lines > 1
                                            ? 'textarea'
                                            : 'input'
                                    }
                                    // Expands textarea to the number of lines in the question
                                    rows={question.lines}
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
