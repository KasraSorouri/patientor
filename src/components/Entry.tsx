import { Entry as EntryType } from "../types"
interface Props {
  entry: EntryType;
}

const Entry = ({entry}: Props) => {
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
        </li>
      ))}
    </div>
  );
};

export default Entry;