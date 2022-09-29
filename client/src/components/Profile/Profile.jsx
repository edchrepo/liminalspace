import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getPostsBySearch } from '../../actions/posts'
import useStyles from './styles'

const Profile = () => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPostsBySearch({ search: 'none', name: user?.result?.given_name }))
    }, [])

    if(isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>
    }

    const openPost = (_id) => history.push(`/posts/${_id}`);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <Typography variant="h3" component="h2">{user?.result?.given_name}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <img className={classes.media} src={user?.result?.picture 
                    || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={"profile"} />
            </div>
            <br />
            {posts.length && (
                <div className={classes.section}>
                    <Typography gutterButtom variant="h5"> Your Posts:</Typography>
                    <Divider />
                    <div className={classes.posts}>
                        {posts.map(({ title, message, name, likes, selectedFile, _id}) => (
                            <div style={{ margin: '20px', cursor: "pointer" }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img alt = {"recimage"} src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default Profile;