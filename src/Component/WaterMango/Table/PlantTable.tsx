import React from 'react';
import { Typography, TableHead, TableRow, TableCell, TableBody, Button, Table } from '@material-ui/core';
import { PlantModel } from '../../../Model/Models';
import PlantRow from './PlantRow';

type TableProps = {
    title: string,
    headers: string[],
    rows : any//PlantModel[]
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
                 {props.rows.map((row: any) => <PlantRow row={row}/>)}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default PlantTable;