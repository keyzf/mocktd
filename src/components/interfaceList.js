import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'gmater/List';
import ListItem from 'gmater/ListItem';
import TextField from 'gmater/TextField';
import Tooltip  from 'gmater/Tooltip';
import ListItemText from 'gmater/ListItemText';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
const styles = () => ({
    root: {},
    empty: {
        padding: '20px',
    },
    listItem: {
        whiteSpace: 'nowrap',
    },
    jiekouLink: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        minWidth: 0,
        color: '#0000008a',
        maxWidth: '400px'
    }
});
class InterfaceList extends Component {
    state = {
        currentSelectId: null,
        searchValue: '',
    }
    static autoActions = [{
        name: 'interface/getList',
        params: {
            projectId: "{projectId}",
        }
    }];
    searchValueChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    }
    render() {
        const {classes} = this.props;
        const list = [];
        this.props.interfaces.forEach((value) => {
            if (this.state.searchValue.trim() === ''
                || (this.state.searchValue.trim() !== '' && (value.name.indexOf(this.state.searchValue) > 0 || value.url.indexOf(this.state.searchValue) > 0))) {
                list.push(
                    <Tooltip enterDelay="800" title={`${value.url.substring(1)}`} key={value.id}>
                        <ListItem className={classes.listItem} selected={this.props.interfaceId == value.id} button onClick={() => {
                            this.props.onSelect(value.id)
                        }}>
                            <ListItemText primary={value.name} />
                            <a className={classes.jiekouLink} target="_blank" href={`/mock/${this.props.currentProject.url}${value.url}`}>访问</a>
                        </ListItem>
                    </Tooltip>
                );
            }
        });
        return (
            <div className={classes.root}>
                <div style={{ padding: "0 8px" }}>
                    <TextField
                        label="搜索"
                        placeholder="支持名称和url搜索"
                        value={this.state.searchValue}
                        onChange={this.searchValueChange.bind(this)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                {
                    list.length > 0 ? (
                        <List component="nav">
                            { list }
                        </List>
                    ) : (
                        <div className={classes.empty}>
                            没有接口
                        </div>
                    )
                }
                
            </div>
        );
    }
}
InterfaceList.propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
}
export default connect((state) => {
    return {
        interfaces: state.interface.interfaces,
        currentProject: state.project.currentProject
    }
})(withStyles(styles)(InterfaceList));