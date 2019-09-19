import React from 'react';
import { Typography, TableHead, TableRow, TableCell, TableBody, Button, Table } from '@material-ui/core';
import { PlantModel } from '../../../Model/Models';
import PlantRow from './PlantRow';
import PlantContainer from '../../../Container/PlantContainer';

type TableProps = {
    title: string,
    headers: string[],
    container : PlantContainer
}

const PlantTable = (props: TableProps) => {
    return (
        <React.Fragment>
            <Typography variant="h6" >{props.title}</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {props.headers.map(head => <TableCell>{head}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                       {props.container.getRows().map((row: PlantModel) => <PlantRow row={row} container={props.container}/>)}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default PlantTable;