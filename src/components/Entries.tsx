import { Entry as EntryType } from "../types"
import Entry from "./Entry";

interface Props {
  entries:EntryType[] | undefined;
};
const Entries = ({entries}: Props) => {

  if(!entries) {
    return null;
  }

  return (
    <div>
        {entries.map(entry => (
            <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  )
  
};



export default Entries;