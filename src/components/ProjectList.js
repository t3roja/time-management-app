import React, { useState } from 'react';
import { Card, CardContent, Typography, Collapse, IconButton, Box, Divider, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import '../styles/ButtonStyles'
import { buttonStyles } from '../styles/ButtonStyles';



export default function ProjectList({ projects }) {



  if (!projects) return <p>Ladataan projekteja...</p>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Box>
  );
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        transition: '0.3s',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardContent
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setOpen(!open)}
      >
        <Box>
          <Typography variant="h6" noWrap>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Projektin ID: {project.id}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            Tunnit yhteensä: {project.tunnit || 0}
          </Typography>
        </Box>
        <IconButton size="small">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </CardContent>

      <Collapse in={open}>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Työtunnit
          </Typography>

          {project.entries.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Ei tuntikirjauksia
            </Typography>
          ) : (
            project.entries.map((entry) => (
              <Box
                key={entry.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 0.5,
                  borderBottom: '1px solid #eee',
                }}
              >
                <Typography variant="body2">{entry.date}</Typography>
                <Typography variant="body2">{entry.task}</Typography>
                <Typography variant="body2">{entry.hours} h</Typography>


              </Box>
            ))
          )}
          <Button sx={buttonStyles.primary} onClick={() => navigate("addentryform/" + project.id)}>Uusi Kirjaus</Button>
        </Box>
      </Collapse>
    </Card>
  );
}
