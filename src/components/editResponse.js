import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
const styles = () => ({
    root: {
    }
});
class EditResponse extends Component {
    state = {
        value: '',
    };
    timer = null;
    contentChange(...args) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.dispatch('response/upateContent', {
                content: args[2],
                responseId: this.props.responseId,
            })
        }, 1000);
    }
    render() {
        const {classes} = this.props;
        let value = '';
        this.props.responses.forEach((response) => {
            if (response.id == this.props.responseId) {
                value = response.content;
            }
        });
        return (
            <div className={classes.root}>
                <CodeMirror
                    value={value}
                    options={{
                        mode: 'javascript',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    onChange={this.contentChange.bind(this)}
                />
            </div>
        );
    }
}
EditResponse.propTypes = {
    classes: PropTypes.object.isRequired,
    responseId: PropTypes.string.isRequired,
}
export default connect((state) => {
    return {
        responses: state.response.responses,
        responseType: state.response.responseType,
    }
})(withStyles(styles)(EditResponse));