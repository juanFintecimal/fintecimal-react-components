import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {

  },

  img: {
    maxWidth: '100%',
    height: '25vh', // FIX BIG IMAGE
    display: 'block',
  },

  actionContainer: {
    padding: theme.spacing(1),
    backgroundColor: 'transparent'
  },

  actions: {
    top: 0,
    right: 0,
    position: 'absolute',
    height: '100%',
    width: '20%',
    minWidth: '180px',
    backgroundColor: 'transparent'
  },

  button: {
    fontSize: '12px',
    textTransform: 'initial',
    color: '#FFF',
    borderRadius: '3px',

    '& > span > svg': {
      color: theme.palette.primary.main,
      paddingRight: theme.spacing(1),
    },
  },
}));
