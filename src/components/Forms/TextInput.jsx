import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
  return(
    <TextField 
      fullWidth={true}
      label={props.label} 
      margin={'dense'}
      // 複数行の時
      multiline={props.multiline}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput