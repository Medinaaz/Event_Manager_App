import React from "react";
import { Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Login from "./components/login/login"
import CreateEvent from "./components/createEvent/createEvent"
import AddContact from "./components/addContact/addContact"
import AllEvents from "./components/allEvents/allEvents"

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/create-meeting" exact component={CreateEvent} />
                    <Route path="/add-contact" exact component={AddContact} />
                    <Route path="/display-meetings" exact component={AllEvents} />
                </Switch>
            </Router>
        );
    }
}

export default App;
