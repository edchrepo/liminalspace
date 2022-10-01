import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Typography, Toolbar, Button, Switch } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import liminalText from '../../images/liminalText.png';
import liminalLogo from '../../images/liminalLogo.png';
import useStyles from './styles';

const Navbar = ( { mode, change} ) => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            //if expired date
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const openProfile = () => history.push(`/profile/${user?.result?.given_name.replace(/\s/g, '')}`);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
            <img src={liminalText} alt="icon" height="45px" />
            <img className={classes.image} src={liminalLogo} alt="icon" height="40px"/>
        </Link>
        <Switch 
            defaultChecked
            color="default"
            inputProps={{'aria-label': 'checkbox with default color'}}
            onChange={change}
            checked={mode}
        />
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar
                        style={{
                            cursor: 'pointer',
                            backgroundColor: isHover ? 'gray' : 'lightgray',
                        }}
                        alt={user.result.picture} src={user.result.picture || user.result.selectedFile}
                        referrerpolicy="no-referrer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={openProfile}
                        >
                        {!user.result.picture && <PersonIcon />}
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.given_name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ): (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
        </AppBar>
    );
}

export default Navbar;