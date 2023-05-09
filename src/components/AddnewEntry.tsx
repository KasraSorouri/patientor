import { Box, Button, Stack, TextField } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { EntryWithoutId, HealthCheckRating } from "../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddNewEntry = ({ onSubmit, onCancel } : Props ) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthRating, SetHealthRating ] = useState('')
  const [diagnosis, SetDiagnosis] = useState('')


  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    let healthCheckRating : HealthCheckRating = 1;

    if ( Object.values(HealthCheckRating).map(r => r.toString()).includes(healthRating) ) {
      healthCheckRating = Number(healthRating)
    } 
    onSubmit({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes:  diagnosis ? diagnosis.split(',') : undefined,
      healthCheckRating : Number(healthRating)
    })
  }

  return (
    <div>
      Add new Entry
      <Box border={'dashed'} margin={2} flex={'xl'} >
        <form onSubmit={addEntry}>
        <TextField
          label="description"
          fullWidth 
          margin="normal"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth 
          margin="normal"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="healthRating"
          fullWidth 
          margin="normal"
          value={healthRating}
          onChange={({ target }) => SetHealthRating(target.value)}
        />
        <TextField
          label="diagnosis codes"
          fullWidth 
          margin="normal"
          value={diagnosis}
          onChange={({ target }) => SetDiagnosis(target.value)}
        />
        <Stack justifyContent={'space-between'} direction={'row'}>
        <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
              sx={{ margin: 1 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: 1 }}
            >
              Add
            </Button>
        </Stack>
        
            </form>
      </Box>
    </div>
  )
}

export default AddNewEntry