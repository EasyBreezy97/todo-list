import React from 'react';
import {Input,Button,FormGroup,InputGroup} from 'reactstrap';

const EnterData = (props) => {
  return(
    <React.Fragment>
       <FormGroup>
         <InputGroup>
          <Input onChange={props.add} type="text" placeholder="What do you want todo ?"/>
          <Button onClick={props.submit} color="success" size="sm" className = "ml-2">Add</Button>
        </InputGroup>
      </FormGroup>
    </React.Fragment>
  );
}

export default EnterData;