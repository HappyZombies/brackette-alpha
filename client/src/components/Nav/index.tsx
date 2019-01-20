import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


const ButtonAppBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <Icon>menu</Icon>
                </IconButton>
                <Typography variant="title" color="inherit">
                    News
                    </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}


export default ButtonAppBar;
