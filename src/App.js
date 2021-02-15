import React from 'react';
import Home from './components/Home';
import NavigationWithRouter from './components/Navigation';
import sample from './data/sample.json';
import spi from './data/spi.json';
import SampleSurvey from './components/SampleSurvey';
import SensoryPreferences from './components/SensoryPreferences';
import { Route, Switch } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
        <div>
            <NavigationWithRouter />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/sample-survey">
                    <SampleSurvey data={sample} />
                </Route>
                <Route path="/sensory-preferences">
                    <SensoryPreferences data={spi} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
