import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
const Navigation = (props) => {
    const { location } = props;
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand eventkey="/" href="/">
                    a/A Forms
                </Navbar.Brand>
                <Nav activeKey={location.pathname} className="mr-auto">
                    <Nav.Link href="/sample-survey">Sample Survery</Nav.Link>
                    <Nav.Link href="/sensory-preferences">
                        Sensory Preferences
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
};

const NavigationWithRouter = withRouter(Navigation);
export default NavigationWithRouter;
