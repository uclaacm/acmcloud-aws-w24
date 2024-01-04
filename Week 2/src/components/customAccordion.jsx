import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    backgroundColor: 'var(--light-secondary)',
    '& .MuiAutocomplete-root': {
      '& fieldset': {
        borderColor: 'var(--light-secondary)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--light-secondary)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--light-secondary)',
      },
    },
    "& + .MuiAutocomplete-popper .MuiAutocomplete-option": 
    {
    backgroundColor: "var(--light-secondary)",
    }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: 'var(--light-tertiary)'
}));

export default function CustomizedAccordion({data}) {
  const [expanded, setExpanded] = React.useState('0');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        {data.map((tab, index) =>
        <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
            <AccordionSummary>
                <Typography>{tab.name}</Typography>
            </AccordionSummary> 
            <AccordionDetails>
                <Typography>
                    {tab.text}
                </Typography>
            </AccordionDetails>
        </Accordion>
        )}
    </div>
  );
}