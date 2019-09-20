import React from 'react';
import { TableRow, TableCell} from '@material-ui/core';
import PlantContainer from '../../../Container/PlantContainer';
import { PlantModel } from '../../../Model/Models';
import moment from 'moment';
import {Subscribe } from 'unstated';
import PlantStatusChip from './PlantStatusChip';
import PlantGiveWaterButton from './PlantGiveWaterButton';

type PlantRowProps = {
    row: PlantModel
}

const PlantRow = (props: PlantRowProps) => {
    return(
        <React.Fragment>
            <Subscribe to={[PlantContainer]}>
            { () => (
                <TableRow key={props.row.id}>
                    <TableCell>{props.row.name}</TableCell>
                    <TableCell>{moment(props.row.lastWaterSession).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell><PlantStatusChip status={props.row.status}/></TableCell>
                    <TableCell>
                        <PlantGiveWaterButton row={props.row}></PlantGiveWaterButton>
                    </TableCell>
                </TableRow>
            )}
            </Subscribe>
        </React.Fragment>
    )
}

export default PlantRow;