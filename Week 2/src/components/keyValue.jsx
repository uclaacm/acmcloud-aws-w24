import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const KeyValuePairsDisplay = ({ data, editable, removePair, addPair }) => {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');


  const handleAdd = () => {
    if (onAdd && newKey && newValue) {
      onAdd(newKey, newValue);
      setNewKey('');
      setNewValue('');
    }
  };

  return (
    <div>
        <div class="profileDetails paddingBottom">
            {Object.keys(data).map((key) => 
            <div key={key}>
                <IconButton
                    aria-label="delete"
                    onClick={() => removePair(key)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>)}
            <TextField
              label="New Key"
              variant="outlined"
              fullWidth
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <TextField
              label="New Value"
              variant="outlined"
              fullWidth
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addPair}
              fullWidth
            >
              Add
            </Button>
        </div>
    </div>
  );
};

export default KeyValuePairsDisplay;
