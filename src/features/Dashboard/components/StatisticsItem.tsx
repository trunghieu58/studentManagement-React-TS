import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface IStatisticItemProps {
    icon: React.ReactElement;
    label: string;
    value: string | number;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'rwo nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1,2),
        border:  `1px solid ${theme.palette.divider}`
    },
}))

export default function StatisticItem (props: IStatisticItemProps) {
    const {icon, label, value} = props;
    const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Box>
          {icon}
      </Box>

      <Box>
        <Typography variant="h5" align="right">{value}</Typography>
        <Typography variant="h6">{label}</Typography>
      </Box>
    </Paper>
  );
}
