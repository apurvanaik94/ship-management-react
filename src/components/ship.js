import React, { useState,useEffect } from 'react';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts } from 'react-toast-notifications';

import * as actions from '../actions/ship';
import ShipForm from './shipForm';

const styles= theme => ({
  root:{
    '& .MuiTableCell-head':{
      fontSize:'1.25rem'
    }
  },
  paper:{
    margin:theme.spacing(2),
    padding:theme.spacing(2)
  }
})

const Ship = ({classes,...props}) => {
  const[currentId,setCurrentId]=useState(0);

  useEffect(() => {
    props.fetchAllShips();
  },[]);

  const { addToast } = useToasts();

  const onDelete=id=>{
    if(window.confirm('Are you sure you wnat to delete this record?'))
    {
      props.deleteShip(id,()=>addToast('Deleted successfully',{appearance:'info'}));
    }
  }
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <ShipForm {...({currentId,setCurrentId})}/>
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>Width</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.shipList.map((record,index)=>{
                  console.log(props.shipList);
                  return(
                    <TableRow key={index} hover>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.length} meters</TableCell>
                      <TableCell>{record.width} meters</TableCell>
                      <TableCell>{record.code}</TableCell>
                      <TableCell>
                        <ButtonGroup variant='text' >
                          <Button><EditIcon color='primary' onClick={()=>{setCurrentId(record.id)}}/></Button>
                          <Button><DeleteIcon color='secondary' onClick={()=>{onDelete(record.id)}}/></Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>);
}
const mapStateToProps = state => (
  {
    shipList: state.ship.list
  }
)

const mapActionToProps = {
  fetchAllShips: actions.fetchAll,
  deleteShip:actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Ship));

