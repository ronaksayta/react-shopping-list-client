import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '25rem',
        backgroundColor: theme.palette.background.paper,
        border: '100px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    scrollPaper: {
        alignItems: 'baseline'
    }
}));

export class ItemModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    } 

    handleOpen = () => {
        this.setState((state) => ({
            open: true
        }))
    };

    handleClose = () => {
        this.setState((state) => ({
            open: false
        }))
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const newItem = {
            name: this.state.name
        }

        this.props.addItem(newItem);
        this.handleClose();
    }


    render() {

        const { classes } = this.props;

        return (
            <div>
                { this.props.isAuthenticated ? <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleOpen}
                    startIcon={<AddIcon />}>
                    Add Item
                    </Button> : <Typography variant = "h6">Please log in to manage items</Typography>}
                
                <Dialog classes={{ scrollPaper: classes.scrollPaper, paper: classes.paper }} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
                    <Divider />
                    <form onSubmit={this.onSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                onChange={this.onChange}
                                id="name"
                                name="name"
                                variant="outlined"
                                label="Shopping List Item"
                                type="text"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary">
                                Add Item
                        </Button>
                            <Button type="button" variant="contained" onClick={this.handleClose} color="secondary">
                                Cancel
                        </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(withStyles(useStyles)(ItemModal));

