import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { defaultCipherList } from 'constants';

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