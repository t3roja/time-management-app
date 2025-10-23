
import { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList'
import { fetchProjects } from '../helpers/Api';
import { Box } from '@mui/material';
import { styles } from '../styles/Styles';


export default function Home() {
  
  const [projects, setProjects] = useState([])

useEffect(() => {
  const getProjects = async () => {
    try {
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  getProjects() 

  const interval = setInterval(getProjects, 5000)

  return () => clearInterval(interval)
}, [])



  return (
    <Box sx={styles.mainBox}>
      <p>HOME</p>
      <ProjectList projects={projects} setProjects={setProjects}/>
    </Box>
  )
}

