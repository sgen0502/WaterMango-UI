import React from 'react';
import { Typography, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core';
import { PlantModel } from '../../../Model/Models';
import PlantRow from './PlantRow';
import PlantContainer from '../../../Container/PlantContainer';

type TableProps = {
    title: string,
    headers: string[],
    container : PlantContainer
}

const PlantTable = (props: TableProps) => {
    
    React.useEffect(() => {
        props.container.loadRows();
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h6" >{props.title}</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {props.headers.map(head => <TableCell key={head}>{head}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                       {props.container.getRows().map((row: PlantModel) => <PlantRow key={row.id} row={row} />)}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default PlantTable;