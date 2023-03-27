import { Button } from "@mui/material";
import { Entry as EntryType } from "../types"
import Entry from "./Entry";

interface Props {
  entries:EntryType[] | undefined;
};
const Entries = ({entries}: Props) => {

  if(!entries) {
    return null;
  }

  const addNewEntry = () => {
    console.log('test');
    
  }

  return (
    <div>
      {entries.map(entry => (
            <Entry key={entry.id} entry={entry} />
      ))}
      <Button onClick={addNewEntry} variant="contained" color="primary" >Add New Entry</Button>
    </div>
  )
  
};



export default Entries;