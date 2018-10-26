import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropChecks from 'prop-checks';
import List from 'gmater/List';
import ListItem from 'gmater/ListItem';
import ListItemText from 'gmater/ListItemText';
import AppBar from 'gmater/AppBar';
import Toolbar from 'gmater/Toolbar';
import Paper from 'gmater/Paper';
import ListItemSecondaryAction from 'gmater/ListItemSecondaryAction';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
import AddProject from './addProject';
import EditProject from './EditProject';
const styles = () => ({
    root: {},
    empty: {
        padding: '20px'
    },
    grow: {
        flexGrow: 1,
    },
    appbar: {
        marginBottom: '10px',
    }
});
class Project extends Component {
    onSelect(id) {
        this.props.history.push(`/interface/${id}`);
    }
    static autoActions = [
        'project/getList',
        {
            name: 'user/getUserInfo'
        }
    ];
    static requireProps = {
        userInfo: PropChecks.object.isRequired
    }
    render() {
        const {classes} = this.props;
        const list = [];
        this.props.projects.forEach((value) => {
            list.push(
                <ListItem button key={value.id} onClick={() => {this.onSelect(value.id)}}>
                    <ListItemText primary={value.name} />
                    <ListItemText primary={value.url} />
                    <ListItemText primary={value.host} />
                    <ListItemSecondaryAction>
                        <EditProject projectId={value.id} />
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} position="static" color="default">
                    <Toolbar>
                        <AddProject />
                        <div className={classes.grow}></div>
                        <div>
                            <a href="/auth/logout">当前用户：{this.props.userInfo.username}。点击退出</a>
                        </div>
                    </Toolbar>
                </AppBar>
                {
                    list.length > 0 ? (
                        <List component="nav">
                            { list }
                        </List>
                    ) : (
                        <Paper>
                            <div className={classes.empty}>没有项目，请新建</div>
                        </Paper>
                    )
                }
            </div>
        );
    }
}
Project.propTypes = {
    classes: PropTypes.object.isRequired
}
export default connect((state) => {
    return {
        projects: state.project.projects,
        userInfo: state.user.userInfo,
    }
})(withStyles(styles)(Project));