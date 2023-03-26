import { useState, useEffect } from "react";
import diagnosesServise from "../services/diagnoses"
import { Diagnosis, Entry as EntryType } from "../types"

interface Props {
  entry: EntryType;
}

const Entry = ({entry}: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesServise.getAll();
      setDiagnoses(diagnoses);
    }
    void fetchDiagnoses();
  }, []);
  
  return (
    <div>
      <p>
        {entry.date} 
        &nbsp;
        {entry.description}
      </p>
      {entry.diagnosisCodes?.map(diag => (
        <li key={diag}>
          {diag}
          &nbsp;
          {diagnoses.find(d => d.code === diag)?.name}
        </li>
      ))}
    </div>
  );
};

export default Entry;