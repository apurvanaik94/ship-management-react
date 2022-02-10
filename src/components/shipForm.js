import { Button, Grid, TextField, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import useForm from './useForm'
import * as actions from '../actions/ship';

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minwidth: 230
    }
  },
  smMargin: {
    margin: theme.spacing(1)
  }
})
const requiredText = 'This field is required. ';
const empty = '';
const initialFieldValues = {
  name: empty,
  length: empty,
  width: empty,
  code: empty
}

const ShipForm = ({ classes, ...props }) => {

  const { addToast } = useToasts();
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.shipList.find(x => x.id === props.currentId)
      })
      setErrors({});
    }
  }, [props.currentId]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    const existingShip=props.shipList.find(x => x.code === fieldValues.code);
    if ('name' in fieldValues) { temp.name = fieldValues.name ? empty : requiredText; 
    temp.name=(/^[A-Za-z0-9\s]+$/).test(fieldValues.name)? empty : temp.name + 'Enter valid name(No special characters allowed)';}
    if ('length' in fieldValues) { temp.length = (fieldValues.length && fieldValues.length > 0) ? empty : requiredText; }
    if ('width' in fieldValues) { temp.width = (fieldValues.width && fieldValues.width > 0) ? empty : requiredText; }
    if ('code' in fieldValues) {
      temp.code = fieldValues.code ? empty : requiredText;
      temp.code =(existingShip && (existingShip.id!==props.currentId))? 'Code already exists':empty;
      temp.code = (/^[A-Z]{4}-([0-9]{4})-([A-Z][0-9])$/).test(fieldValues.code) ? empty : temp.code + 'Code is not valid (eg.AAAA-3333-A1)';
    }
    setErrors({
      ...temp
    });
    if (fieldValues === values)
      return Object.values(temp).every(v => v === empty)
  }

  const { values, setValues, handleInputChange, errors, setErrors, resetForm } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const onSuccess=()=>{
        resetForm();
        addToast('Submitted successfully',{appearance:'success'})};
      if (props.currentId === 0) {
        props.createShip(values, onSuccess);

      }
      else {
        props.updateShip(props.currentId, values, onSuccess);
      }
    }
  }

  return (
    <form noValidate autoComplete='off' className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField id="name" name="name" variant="outlined" required label="Name" value={values.name} onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })} />
          <TextField id="length" name="length" variant="outlined" required type="number" label="Length" value={values.length} onChange={handleInputChange}
            {...(errors.length && { error: true, helperText: errors.length })} />
          <TextField id="width" name="width" variant="outlined" type="number" required label="Width" value={values.width} onChange={handleInputChange}
            {...(errors.width && { error: true, helperText: errors.width })} />
          <TextField id="code" name="code" variant="outlined" required label="Code" value={values.code} onChange={handleInputChange}
            {...(errors.code && { error: true, helperText: errors.code })} />
          <div>
            <Button id="btnSubmit"color="primary" variant="contained" type="submit" className={classes.smMargin}>Submit</Button>
            <Button color="primary" variant="contained" className={classes.smMargin} onClick={resetForm}>Reset</Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = state => (
  {
    shipList: state.ship.list
  }
)

const mapActionToProps = {
  createShip: actions.create,
  updateShip: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ShipForm));
