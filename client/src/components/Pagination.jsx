import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import { getPosts } from '../actions/posts';

//used to cut down on loadtime, render only limited amount per page instead of all posts

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        // when page number changes, re-renders next page of posts in Home
        if(page) dispatch(getPosts(page));
    }, [page])

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
};

export default Paginate;