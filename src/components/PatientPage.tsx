import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Gender, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
  const id = useParams().id
  const [patient, setPatient] = useState<Patient>()
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
         const result = await patientService.getPatientById(id);
         setPatient(result)
      }
    };
    void fetchPatient();
  },[])
  console.log(patient);

  return(
    <div>
        <Typography variant='h4' style={{ marginBottom: "0.5em" }}>
            {patient?.name} &nbsp;
            {patient?.gender === Gender.Female? (<FemaleIcon />) : null}
            {patient?.gender === Gender.Male? (<MaleIcon />) : null}
            {patient?.gender === Gender.Other? (<TransgenderIcon />) : null}
        </Typography>
        <Typography>
          <p>
            ssn: {patient?.ssn}
          </p>
          <p>
            occupatopn: {patient?.occupation}
          </p>
        </Typography>
        
        
    </div>
  );
}


export default PatientPage;