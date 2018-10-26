import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropChecks from 'prop-checks';
import Radio from 'gmater/Radio';
import RadioGroup from 'gmater/RadioGroup';
import FormControlLabel from 'gmater/FormControlLabel';
import FormControl from 'gmater/FormControl';
import FormLabel from 'gmater/FormLabel';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
import AddResponse from './addResponse';
import EditResponse from './editResponse';
const styles = () => ({
    legend: {
        textAlign: 'left',
        marginRight: '20px',
    },
    ['add-response-wrap']: {
        display: 'flex',
        alignItems: 'center'
    }
});
class Response extends Component {
    state = {
    };
    static autoActions = [
        {
            name: 'response/getTypes',
            params: {
                interfaceId: '{interfaceId}',
            }
        }
    ]
    static requireProps = {
        responses: PropChecks.array.isRequired
    }
    handleChange(e, responseType) {
        this.props.dispatch('interface/changeResponseType', {
            responseType,
            interfaceId: this.props.interfaceId,
        });
    }
    render() {
        const {classes} = this.props;
        const responses = [];
        this.props.responses.forEach((value) => {
            responses.push(
                <FormControlLabel key={value.id} value={value.id.toString()} control={<Radio />} label={`${value.name} - ${value.type===1?'静态数据':'动态脚本'}`} />
            );
        });
        responses.push(
            <FormControlLabel key={'0'} value={'0'} control={<Radio />} label="在线转发" />
        );
        return (
            <div className={classes.legend}>
                <FormControl style={{ margin: 9 }} component="fieldset" fullWidth={true} className={classes.formControl}>
                    <div className={classes['add-response-wrap']}>
                        <FormLabel component="legend" className={classes.legend}>返回内容</FormLabel>
                        <AddResponse projectId={this.props.projectId} currentSelectId={this.props.interfaceId} />
                    </div>
                    <RadioGroup
                        row
                        aria-label="返回内容"
                        className={classes.group}
                        value={this.props.responseType}
                        onChange={this.handleChange.bind(this)}
                    >
                        {responses}
                    </RadioGroup>
                </FormControl>
                { this.props.responseType != 0 ? <EditResponse responseId={this.props.responseType} /> : <div>
                    当前转发host为：{this.props.currentProject.host}
                </div> }
            </div>
        );
    }
}
Response.propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
}
export default connect((state) => {
    return {
        responses: state.response.responses,
        responseType: state.response.type,
        currentProject: state.project.currentProject
    }
})(withStyles(styles)(Response));