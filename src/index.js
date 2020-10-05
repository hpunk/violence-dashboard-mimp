import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import routes from './routes/routes.js';
import { createBrowserHistory } from "history";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import Main from "./views/Main/Main";

const history = createBrowserHistory();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router history={history}>
            <Switch>
            <Route path="/" exact component={Main}></Route>
                {
                    routes.map((prop,key)=>{
                        return(
                            <Route path={prop.path} component={prop.component} key={key} exact={prop.exact}/>
                        );
                    })
                }
            </Switch>
        </Router>
    </MuiThemeProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();
