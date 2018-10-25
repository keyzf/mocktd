import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'gmater/Button';
import Dialog from 'gmater/Dialog';
import DialogActions from 'gmater/DialogActions';
import DialogContent from 'gmater/DialogContent';
import Radio from 'gmater/Radio';
import RadioGroup from 'gmater/RadioGroup';
import FormControlLabel from 'gmater/FormControlLabel';
import FormControl from 'gmater/FormControl';
import DialogTitle from 'gmater/DialogTitle';
import Input from 'gmater/Input';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    legend: {
        textAlign: 'left'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
class AddResponse extends Component {
    state = {
        open: false,
        value: '',
        type: '1'
    };
    inputChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    addResponse() {
        this.props.dispatch('response/addType', {
            interfaceId: this.props.currentSelectId,
            name: this.state.value,
            responseType: this.state.type,
            projectId: this.props.projectId,
        }).then(() => {
            this.setState({
                open: false
            });
        });
    }
    handleChange(...args) {
        this.setState({
            type: args[1],
        });
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Button onClick={this.handleClickOpen.bind(this)} variant="contained" color="primary" className={classes.button}>
                    添加Response
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"添加新接口"}</DialogTitle>
                    <DialogContent>
                        <Input
                            value={this.state.value}
                            onInput={this.inputChange.bind(this)}
                            placeholder="请输入返回内容名称"
                            className={classes.input}
                            fullWidth
                            inputProps={{
                                'aria-label': 'Description',
                            }}/>
                        <FormControl component="fieldset" fullWidth={true} className={classes.formControl}>
                            <RadioGroup
                                row
                                aria-label="返回内容"
                                className={classes.group}
                                value={this.state.type}
                                onChange={this.handleChange.bind(this)}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="静态JSON" />
                                <FormControlLabel value="2" control={<Radio />} label="动态脚本" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.addResponse.bind(this)} color="primary" autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
AddResponse.propTypes = {
    classes: PropTypes.object.isRequired,
    currentSelectId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
}
export default connect((state) => {
    return {
        state
    }
})(withStyles(styles)(AddResponse));