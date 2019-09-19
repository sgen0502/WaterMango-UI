import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

type HeaderProps = {
    title: String
}

const WaterMangoHeader = (props: HeaderProps) => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" >{props.title}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default WaterMangoHeader;