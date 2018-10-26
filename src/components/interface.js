// @ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropChecks from 'prop-checks';
import Grid from 'gmater/Grid';
import Paper from 'gmater/Paper';
import AppBar from 'gmater/AppBar';
import Toolbar from 'gmater/Toolbar';
import Button from 'gmater/Button';
import { withStyles } from 'gmater/styles'; 
import { connect } from '../createProvider';
import Add from './add';
import List from './interfaceList';
import InterfaceDetail from './interfaceDetail';
import Response from './response';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    empty: {
        padding: '20px'
    },
    paper: {
        overflow: 'auto',
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        height: "100%"
    },
    grow: {
        flexGrow: 1,
    },
    appbar: {
        marginBottom: '10px',
    },
    deleteWrap: {
        borderTop: '1px solid #ccc',
        marginTop: '20px',
        paddingTop: '8px',
    },
    container: {
        position: 'fixed',
        top: '70px',
        bottom: '0px'
    },
    leftList: {
        height: '100%',
        overflow: 'auto',
    },
});
class Interfaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interfaceId: this.props.match.params.interfaceId,
            projectId: this.props.match.params.projectId
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    componentWillReceiveProps(props) {
        this.setState({
            interfaceId: props.match.params.interfaceId,
            projectId: props.match.params.projectId
        });
    }
    onSelect(id) {
        this.props.history.push(`/interface/${this.props.match.params.projectId}/${id}`);
    }
    static autoActions = [
        {
            name: 'project/getProjectDetail',
            params: {
                projectId: '{match.params.projectId}'
            }
        }
    ];
    static typeError = function () {
        return (
            <div>
                项目不存在
            </div>
        )
    }
    static requireProps = {
        currentProject: PropChecks.object.isRequired
    }
    delInterface() {
        const result = confirm('你确定要删除吗？');
        if (result) {
            this.props.dispatch('interface/deleteInterface', {
                interfaceId: this.state.interfaceId,
                projectId: this.props.match.params.projectId
            }).then(() => {
                this.props.history.push(`/interface/${this.props.match.params.projectId}`);
            });
        }
    }
    render() {
        const projectId = this.state.projectId;
        // console.log(this.props.projects);
        // this.props.projects.forEach((project) => {
        //     console.log(project, projectId);
        //     if (project.id == projectId) {
        //         projectObj = project;
        //     }
        // });
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} position="fixed" color="default">
                    <Toolbar>
                        <Add projectId={projectId} projectUrl={this.props.currentProject.url}/>
                        <div className={classes.grow}></div>
                        <a href= "/">返回项目列表</a>
                    </Toolbar>
                </AppBar>
                <Grid className={classes.container} container spacing={24}>
                    <Grid item xl={3} md={4} xs={6}>
                        <Paper className={classes.paper} className={classes.leftList}>
                            <List projectId={projectId} interfaceId={this.state.interfaceId} onSelect={this.onSelect.bind(this)} />
                        </Paper>
                    </Grid>
                    <Grid item xl={9} md={8} xs={6}>
                        <Paper className={classes.paper}>
                            {
                                this.state.interfaceId ? 
                                    (
                                        <div>
                                            <InterfaceDetail interfaceId={this.state.interfaceId}  projectId={projectId} />
                                            <Response interfaceId={this.state.interfaceId} projectId={projectId} />
                                            <div className={classes.deleteWrap}>
                                                <Button size="small" onClick={this.delInterface.bind(this)} variant="contained" color="primary">
                                                    删除接口
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>请选择</div>
                                    )
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
Interfaces.propTypes = {
    classes: PropTypes.object.isRequired
}
export default connect((state) => {
    return {
        interfaces: state.interface,
        currentProject: state.project.currentProject,
    }
})(withStyles(styles)(Interfaces));