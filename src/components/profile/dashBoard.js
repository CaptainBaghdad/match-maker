import React from 'react';
import ImageHolder from './profileImages';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

let DashBoardComponent = () =>{
    return (
        <Grid container spacing={2}>
        <Grid item xs={6} lg={3} md={4} sm={5} >
        <ImageHolder />
        </Grid>

        </Grid>
    )
}


export default DashBoardComponent