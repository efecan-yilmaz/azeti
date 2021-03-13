import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

type IndicatorProviderProps = {
    playerName: string;
    score: number;
}

const Score: React.FC<IndicatorProviderProps> = ({ playerName, score}) => {
    return (
        <TableRow>
            <TableCell>
                {playerName}
            </TableCell>
            <TableCell >
                {score}
            </TableCell>
        </TableRow>
    )
}

export default Score
