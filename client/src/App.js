import React from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () => (
    <GoogleOAuthProvider clientId="649002992069-8qglqg6qouog2s89kj716ljln33segta.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxwidth="lg">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/auth" exact component={Auth} />
                    </Switch>
                </Container>
        </BrowserRouter>
    </GoogleOAuthProvider>
)

export default App;