import React from 'react';
import ImageHolder from './profileImages';
import { makeStyles } from '@material-ui/core/styles';
import LeftSideComponent from './leftSide/leftsideComponent';


let DashBoardComponent = () =>{
    return (
        <div>
        
        <ImageHolder />
        <br />
        <LeftSideComponent />
       
        </div>
    )
}


export default DashBoardComponent