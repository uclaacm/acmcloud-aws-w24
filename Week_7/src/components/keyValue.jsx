import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const KeyValuePairsDisplay = ({ data, editable, removePair, addPair }) => {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  return (
    <div>
        <div class="profileDetails paddingBottom">
            {Object.keys(data).map((key, index) => 
            <div key={key}>
                {key}: {data[key]}
                <IconButton
                    aria-label="delete"
                    onClick={() => removePair(key)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>)}
            <div class="columns paddingBottom">
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
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {addPair(newKey, newValue); setNewKey(""); setNewValue("");}}
              fullWidth
            >
              Add
            </Button>
            
        </div>
    </div>
  );
};

export default KeyValuePairsDisplay;
