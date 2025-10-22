
import { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList'
import { fetchProjects } from '../helpers/Api';


export default function Home() {
  
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      try {
      const data = await fetchProjects()
      setProjects(data)
      console.log("home", data)
    } catch (error) {
      console.log(error)
    }
  }
  getProjects()
  }, []);


  return (
    <>
      <ProjectList projects={projects} setProjects={setProjects}/>
    </>
  )
}

