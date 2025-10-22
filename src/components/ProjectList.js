import { useState } from 'react';
import { Card, CardContent, Typography, Collapse, IconButton, Box, Divider, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import '../styles/ButtonStyles'
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';


export default function ProjectList({ projects }) {


  if (!projects) return <p>Ladataan projekteja...</p>;

  return (
    <Box sx={styles.mainBox}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Box>
  );
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleEntryClick = async (entryId) => {
    navigate("/editentry/" + project.id + "/" + entryId)

  }

  return (
    <Card
      variant="outlined"
      sx={styles.card}
    >
      <CardContent
        sx={styles.cardContent}
        onClick={() => setOpen(!open)}
      >
        <Box>
          <Typography variant="h6" noWrap>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Projektin ID: {project.id}
          </Typography>
          <Typography variant="body2" fontWeight="bold"> Tunnit yhteensä: {project.tunnit || 0}
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
                sx={styles.clickableBox}
                onClick={() => handleEntryClick(entry.id)}
              >
                <Typography variant="body2">{entry.date}</Typography>
                <Typography variant="body2">{entry.task}</Typography>
                <Typography variant="body2">{entry.hours} h</Typography>
              </Box>
            ))
          )}
          <Button sx={buttonStyles.primary} onClick={() => navigate("/addentryform/" + project.id)}>Uusi Kirjaus</Button>
        </Box>
      </Collapse>
    </Card>
  );
}
