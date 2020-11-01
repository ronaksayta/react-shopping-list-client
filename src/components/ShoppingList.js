import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ItemModal from './ItemModal';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        margin: 0,
        padding: 0
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

export class ShoppingList extends Component {

    constructor(props) {
        super(props)
        this.onDeleteClick.bind(this);
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick(id) {
        this.props.deleteItem(id)
    }

    render() {

        const { classes } = this.props;
        const { items } = this.props.item;

        return (
            <div>
                <CssBaseline />
                <Container maxWidth={false}>
                    <br />
                    <br />
                   <ItemModal />
                    <Paper style={{ marginTop: '1rem' }}>
                        <List className={classes.list}>
                            <TransitionGroup className="shopping-list">
                                {items.map(({ _id, name }) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <div>
                                            <ListItem>
                                                {this.props.isAuthenticated ? <IconButton aria-label="delete" color="secondary" className = "remove-btn"
                                                onClick = {this.onDeleteClick.bind(this, _id)}>
                                                    <ClearIcon />
                                                </IconButton> : null}
                                                <ListItemText primary={name} />
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </List>
                    </Paper>
                </Container>
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(withStyles(useStyles)(ShoppingList))
