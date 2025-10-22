import React, { useEffect, useState } from 'react'
import AddEntryForm from '../components/AddEntryForm'
import { fetchOneEntry, fetchOneProject } from '../helpers/Api';
import { useParams } from 'react-router-dom';

export default function EditEntry() {

const { projectid, entryid } = useParams();

const [entry, setEntry] = useState(null)
  
  useEffect(() => {
    const getProject = async () => {
      try {
      const data = await fetchOneEntry(projectid,entryid)
      setEntry(data)
    } catch (error) {
      console.log(error)
    }
  }
  getProject()
  }, []);

  if (!entry) return <p>Ladataan Entryä...</p>;


  return (
    <AddEntryForm entry={entry} projectid={projectid}></AddEntryForm>
  )
}
