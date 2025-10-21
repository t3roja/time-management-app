import React from 'react'
import { useState, useEffect } from 'react';
import './Home.css'
import ProjectList from '../components/ProjectList'

const API_URL = process.env.REACT_APP_API_URL

export default function Home() {
  const [projects, setProjects] = useState([])


  useEffect(() => {
    fetchProjects()
  }, []);

  const fetchProjects = async () => {
    try {
    const response = await fetch(API_URL + '/projects')
    const data = await response.json()
    setProjects(data)
    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='ProjectContainer'>
      <ProjectList projects={projects} setProjects={setProjects} />
      {/* <CollapsibleTable projects={projects || []} /> */}
    </div>
  )
}

