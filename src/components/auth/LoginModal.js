import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions'; 
import Alert from '@material-ui/lab/Alert';

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

export class LoginModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            email: '',
            password: '',
            message: null
        }
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ message: error.message.message })
            }
        }

        if (this.state.open) {
            if (isAuthenticated) {
                this.handleClose();
            }
        }
    }

    handleOpen = () => {
        this.props.clearErrors();
        this.setState({ message: null })
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

        const {email, password} = this.state;

        const user = {
            email,
            password
        }

        this.props.login(user);
    }


    render() {

        const { classes } = this.props;

        return (
            <div>
                <Button
                    color="inherit"
                    onClick={this.handleOpen}>
                    Login
                    </Button>
                <Dialog  classes = {{ scrollPaper: classes.scrollPaper }} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <Divider />
                    { this.state.message ? (
                        <Alert severity="error">{this.state.message}</Alert>
                    ) : null}
                    <form onSubmit={this.onSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                onChange={this.onChange}
                                id="email"
                                name="email"
                                variant="outlined"
                                label="Email"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                onChange={this.onChange}
                                id="password"
                                name="password"
                                variant="outlined"
                                label="password"
                                type="password"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary">
                                Login
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(withStyles(useStyles)(LoginModal));


