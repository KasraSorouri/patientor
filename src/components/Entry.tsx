import { Box } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from "react";
import diagnosesServise from "../services/diagnoses"
import { Diagnosis, Entry as EntryType, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types"

const Entry: React.FC<{entry: EntryType}> = ({entry})  => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => { 
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesServise.getAll();
      setDiagnoses(diagnoses);
    }
    void fetchDiagnoses();
  }, []);

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCkeckEntryDetail entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetail entry={entry} diagnoses={diagnoses} />;
    default:
      return null;
  };
};

const HospitalEntryDetail: React.FC<{entry: HospitalEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return(
    <div>
      <Box flex={2} border={2} padding={1} margin={2} >
        {entry.date}
        &nbsp;
        <MedicalServicesIcon />
        <p>
          {entry.description}
        </p>
        <p>
          {entry.diagnosisCodes?.map(diag => (
            <li key={diag}>
              {diag}
              &nbsp;
              {diagnoses.find(d => d.code === diag)?.name}
            </li>
          ))}
        </p>
        <b>discharge:</b>
        <br />
            {entry.discharge.date}
            &nbsp;
            {entry.discharge.criteria}
        <br /> 
        <p>
          <b>diagnosed by:</b> {entry.specialist}
        </p>
      </Box>
    </div>
  )
}

const HealthCkeckEntryDetail: React.FC<{entry: HealthCheckEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  const rateColor = () => {
    switch (entry.healthCheckRating) {
      case 0:  return "green"
      case 1:  return "yellow"
      case 2:  return "orange"
      case 3:  return "red"
      default:
        break;
    };
  };
  
  return(
    <div>
      <Box flex={2} border={2} padding={1} margin={2} >
        {entry.date}
        &nbsp;
        <MedicalServicesIcon />
        <p>
          {entry.description}
        </p>
        <p>
          {entry.diagnosisCodes?.map(diag => (
            <li key={diag}>
              {diag}
              &nbsp;
              {diagnoses.find(d => d.code === diag)?.name}
            </li>
          ))}
        </p>
        <FavoriteIcon htmlColor={rateColor()} />
        <br /> 
        <p>
          <b>diagnosed by:</b> {entry.specialist}
        </p>
      </Box>
    </div>
  )
}

const OccupationalEntryDetail: React.FC<{entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return(
    <div>
      <Box flex={2} border={2} padding={1} margin={2} >
        {entry.date}
        &nbsp;
        <WorkIcon />
        &nbsp;
        {entry.employerName}
        <p>
          {entry.description}
        </p>
        <p>
          {entry.diagnosisCodes?.map(diag => (
            <li key={diag}>
              {diag}
              &nbsp;
              {diagnoses.find(d => d.code === diag)?.name}
            </li>
          ))}
        </p>
        {entry.sickLeave? (
          <p>
            <b>sick leave from:</b> &nbsp; {entry.sickLeave?.startDate} &nbsp; <b>to:</b> &nbsp; {entry.sickLeave?.endDate}
          </p>
          ) : null }
        
        <p>
          <b>diagnosed by:</b> {entry.specialist}
        </p>
      </Box>
    </div>
  )
}

export default Entry;
