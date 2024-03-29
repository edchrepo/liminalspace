import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      height: '50%',
    },
    width: '25vh',
    height: '25vh',
    maxHeight: '600px',

  },
  card: {
    textAlign: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex', justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px', overflowY: 'auto', marginRight: '30px',
  },
  fileInput: {
    width: '100%',
    marginLeft: '3%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10%',
    },
  },
}));