import { useState } from 'react';
import { Card, CardContent, Typography, Collapse, IconButton, Box, Divider, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import '../styles/ButtonStyles'
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';
import { isAdmin } from '../helpers/Api';

export default function ProjectList({ projects }) {
  const navigate = useNavigate();



  if (!projects) return <p>Ladataan projekteja...</p>;

  return (
    <Box sx={styles.mainBox}>

      {projects.length === 0 && (
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
          Ei projekteja vielä – luo ensimmäinen!
        </Typography>
      )}

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {isAdmin() === "true" && <NewProjectCard onClick={() => navigate("/addprojectform")} />}
    </Box>
  );
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleEntryClick = (entryId) => {
    navigate("/editentry/" + project.id + "/" + entryId);
  };

  return (
    <Card variant="outlined" sx={styles.card}>
      <CardContent sx={styles.cardContent} onClick={() => setOpen(!open)}>
        <Box>
          <Typography variant="h6" noWrap>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Projektin ID: {project.id}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            Tunnit yhteensä: {project.totalHours || 0}
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
          <Button
            sx={buttonStyles.primary}
            onClick={() => navigate("/addentryform/" + project.id)}
          >
            Uusi Kirjaus
          </Button>
        </Box>
      </Collapse>
    </Card>
  );
}

function NewProjectCard({ onClick }) {
  return (
    <Card
      variant="outlined"
      sx={styles.newCard}
      onClick={onClick}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <AddCircleOutlineIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="body1" color="primary">
          Uusi Projekti
        </Typography>
      </CardContent>
    </Card>
  );
}
