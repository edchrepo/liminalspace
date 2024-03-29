import React, { useState } from 'react';
import { Container, CssBaseline } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import Profile from './components/Profile/Profile'

const App = () => {
    const [darkMode, setDarkMode] = useState(true)

    const theme=createTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLEID}`}>
                <BrowserRouter>
                    <Container maxwidth="xl">
                            <Navbar mode={darkMode} change={() => setDarkMode(!darkMode)}/>
                            <Switch>
                                <Route path="/" exact component={() => <Redirect to="/posts" />} />
                                <Route path="/posts" exact component={Home} />
                                <Route path="/posts/search" exact component={Home} />
                                <Route path="/posts/:id" component={PostDetails}/>
                                <Route path="/profile/:name" exact component={Profile}/>
                                <Route path="/auth" exact component={Auth}/>
                            </Switch>
                        </Container>
                </BrowserRouter>
            </GoogleOAuthProvider>
        </ThemeProvider>
    )
}

export default App;