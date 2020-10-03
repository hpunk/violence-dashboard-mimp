
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from './views/Main/Main';

class App extends Component {
    render() {
        console.log("HOLA APP");
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Main}></Route>
                    
                    <Route path="*" component={() => "404 NOT FOUND"}></Route>
                    
                </Switch>
            </BrowserRouter>
        )
    }

}

export default App;