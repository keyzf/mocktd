import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'gmater/Button';
import Dialog from 'gmater/Dialog';
import DialogActions from 'gmater/DialogActions';
import DialogContent from 'gmater/DialogContent';
import TextField from 'gmater/TextField';
import DialogTitle from 'gmater/DialogTitle';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
const styles = () => ({
    root: {
        flexGrow: 1,
    }
});
class EditProject extends Component {
    state = {
        open: false,
        nameValue: '',
        addressValue: '',
        hostValue: ''
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    addProject() {
        this.props.dispatch('project/editProject', {
            name: this.state.nameValue,
            url: this.state.addressValue,
            host: this.state.hostValue,
            id: this.props.projectId,
        }).then(() => {
            this.setState({ open: false });
        });
    }
    nameChange(event) {
        this.setState({
            nameValue: event.target.value
        });
    }
    addressChange(event) {
        this.setState({
            addressValue: event.target.value
        });
    }
    hostChange(event) {
        this.setState({
            hostValue: event.target.value
        });
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        let currentProject = {};
        console.log(this.props.projects, this.props.projectId);
        this.props.projects.forEach((project) => {
            if (project.id == this.props.projectId) {
                currentProject = project;
            }
        });
        this.setState({
            nameValue: currentProject.name,
            addressValue: currentProject.url,
            hostValue: currentProject.host,
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Button onClick={this.handleClickOpen.bind(this)} variant="contained" color="primary" className={classes.button}>
                    设置
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"编辑项目属性"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="名称"
                            placeholder="请输入名称"
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
                            value={this.state.addressValue}
                            label="接口地址"
                            placeholder="设置后无法修改"
                            fullWidth
                            disabled
                            margin="normal"
                            variant="outlined"
                            onChange={this.addressChange.bind(this)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            value={this.state.hostValue}
                            label="转发Host"
                            placeholder="请输入转发Host"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={this.hostChange.bind(this)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.addProject.bind(this)} color="primary" autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
EditProject.propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
}
export default connect((state) => {
    return {
        projects: state.project.projects
    }
})(withStyles(styles)(EditProject));