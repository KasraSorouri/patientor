import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Entry, EntryWithoutId, Gender, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Entries from "./Entries";
import AddNewEntry from "./AddnewEntry";

const PatientPage = () => {
  const id = useParams().id
  const [patient, setPatient] = useState<Patient>()
  const [showAddEntryForm, setShowAddEntryForm] = useState<boolean>(false)
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
         const result = await patientService.getPatientById(id);
         setPatient(result)
      }
    };
    void fetchPatient();
  },[id])

  const onSubmit = async (newEntry : EntryWithoutId) => {
    if (!id) {
      throw new Error('Paitient is missing!')
    }
      const result = await patientService.addEntryForPaitient({id, newEntry})
      if (!result){
        throw new Error('Error')
      }
      const entries = patient?.entries?.concat(result.data)
      setPatient({...patient as Patient,entries} )
      setShowAddEntryForm(false);
}

  const showEntryForm = () => {
    setShowAddEntryForm(true)
  }

  const cancelHandler = () =>
    setShowAddEntryForm(false);


  return(
    <div>
      <Typography variant='h3' style={{ marginBottom: "0.5em" }}>
        {patient?.name} &nbsp;
        {patient?.gender === Gender.Female? (<FemaleIcon />) : null}
        {patient?.gender === Gender.Male? (<MaleIcon />) : null}
        {patient?.gender === Gender.Other? (<TransgenderIcon />) : null}
      </Typography>
      <div>
        <p>
          ssn: {patient?.ssn}
        </p>
        <p>
          occupatopn: {patient?.occupation}
        </p>
      </div>
      {showAddEntryForm ? <AddNewEntry onSubmit={onSubmit} onCancel={cancelHandler} /> : null}
      <Typography variant='h4' style={{ marginBottom: "0.5em" }}>
        Entries
      </Typography>
      <Entries entries={patient?.entries} />
      <Button onClick={showEntryForm} variant="contained" color="primary" >Add New Entry</Button>
    </div>
  );
}

export default PatientPage;