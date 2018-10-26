// @ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropChecks from 'prop-checks';
import TextField from 'gmater/TextField';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
const diff = require('deep-diff');
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
class InterfaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: this.props.currentInterface.name,
            urlValue: this.props.currentInterface.url,
        }
    }
    state = {
        nameValue: '',
        urlValue: '',
        url2: ''
    };
    static autoActions = [
        {
            name: 'interface/getDetail',
            params: {
                interfaceId: '{interfaceId}'
            }
        },
    ]
    static requireProps = {
        currentInterface: PropChecks.object.isRequired
    };
    componentWillReceiveProps(props) {
        if (diff(props.currentInterface, this.props.currentInterface)) {
            this.setState({
                nameValue: props.currentInterface.name,
                urlValue: props.currentInterface.url || '',
            });
        }
    }
    nameChange(e) {
        this.setState({
            nameValue: e.target.value,
        });
    }
    urlChange(e) {
        this.setState({
            urlValue: e.target.value,
        });
    }
    nameBlur() {
        this.props.dispatch('interface/editName', {
            name: this.state.nameValue,
            interfaceId: this.props.interfaceId,
            projectId: this.props.projectId,
        })
    }
    urlBlur() {
        this.props.dispatch('interface/editUrl', {
            url: this.state.urlValue,
            interfaceId: this.props.interfaceId,
            projectId: this.props.projectId,
        })
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <TextField
                    label="接口名称"
                    style={{ margin: 8 }}
                    placeholder="请填写接口名称，建议用汉语，有意义的命名"
                    fullWidth
                    value={this.state.nameValue}
                    margin="normal"
                    onChange={this.nameChange.bind(this)}
                    onBlur={this.nameBlur.bind(this)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="接口地址"
                    style={{ margin: 8 }}
                    placeholder="请填写接口url"
                    fullWidth
                    onChange={this.urlChange.bind(this)}
                    onBlur={this.urlBlur.bind(this)}
                    value={this.state.urlValue}
                    margin="normal"
                    helperText={`总体请求地址为：${this.props.currentProject.url}${this.props.currentInterface.url}`}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        );
    }
}
InterfaceDetail.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default connect((state) => {
    return {
        currentInterface: state.interface.currentInterface,
        currentProject: state.project.currentProject
    }
})(withStyles(styles)(InterfaceDetail));