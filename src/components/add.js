import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'gmater/Button';
import Dialog from 'gmater/Dialog';
import DialogActions from 'gmater/DialogActions';
import DialogContent from 'gmater/DialogContent';
import DialogTitle from 'gmater/DialogTitle';
import TextField from 'gmater/TextField';
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
class Add extends Component {
    state = {
        open: false,
        nameValue: '',
        urlValue: ''
    };
    addInterface() {
        if (this.state.nameValue.trim() === '' || this.state.urlValue.trim() === '') {
            alert('内容不能为空');
            return;
        }
        this.props.dispatch('interface/add', {
            name: this.state.nameValue,
            url: this.state.urlValue,
            projectId: this.props.projectId,
            projectUrl: this.props.currentProject.url
        }).then(() => {
            this.setState({
                open: false,
                nameValue: '',
                urlValue: ''
            });
        });
    }
    nameChange(event) {
        this.setState({
            nameValue: event.target.value
        });
    }
    urlChange(event) {
        this.setState({
            urlValue: event.target.value
        });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Button size="small" onClick={this.handleClickOpen.bind(this)} variant="contained" color="primary" className={classes.button}>
                    添加接口
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"添加新接口"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="接口名称"
                            placeholder="请输入接口名称"
                            fullWidth
                            value={this.state.nameValue}
                            margin="normal"
                            variant="outlined"
                            onChange={this.nameChange.bind(this)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="接口地址"
                            placeholder="接口地址"
                            fullWidth
                            value={this.state.urlValue}
                            margin="normal"
                            variant="outlined"
                            onChange={this.urlChange.bind(this)}
                            helperText={`项目的接口地址：${this.props.projectUrl}`}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.addInterface.bind(this)} color="primary" autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
Add.propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
}
export default connect((state) => {
    return {
        interfaceList: state.count,
        currentProject: state.project.currentProject
    }
})(withStyles(styles)(Add));