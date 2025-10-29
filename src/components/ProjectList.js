import { useState } from 'react';
import { Card, CardContent, Typography, Collapse, IconButton, Box, Divider, Button, Checkbox, MenuItem, Select, FormControl,FormControlLabel, InputLabel } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import '../styles/ButtonStyles'
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';
import { isAdmin, markAsComplete } from '../helpers/Api';

export default function ProjectList({ projects }) {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('none');

  if (!projects) return <p>Ladataan projekteja...</p>;

  const getProjectDate = (project, type = 'latest') => {
    if (!project.entries?.length) return 0;
    const dates = project.entries.map(e => new Date(e.date).getTime());
    return type === 'latest' ? Math.max(...dates) : Math.min(...dates);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortOption) {
      case 'completed':
        return (a.completed === b.completed) ? 0 : a.completed ? -1 : 1;
      case 'unCompleted':
        return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
      case 'recent':
        return getProjectDate(b, 'latest') - getProjectDate(a, 'latest');
      case 'oldest':
        return getProjectDate(a, 'oldest') - getProjectDate(b, 'oldest');
      default:
        return 0;
    }
  });


  return (
    <Box sx={styles.mainBox}>
      <FormControl>
        <InputLabel id="sort-label">Järjestä</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOption}
          label="Järjestä"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <MenuItem value="completed">Valmiit ensin</MenuItem>
          <MenuItem value="unCompleted">Keskeneräiset ensin</MenuItem>
          <MenuItem value="recent">Uusimmat kirjaukset ensin</MenuItem>
          <MenuItem value="oldest">Vanhimmat kirjaukset ensin</MenuItem>
        </Select>
      </FormControl>

      {sortedProjects.length === 0 && (
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
          Ei projekteja vielä – luo ensimmäinen!
        </Typography>
      )}

      {sortedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {isAdmin() === "true" && <NewProjectCard onClick={() => navigate("/addprojectform")} />}
    </Box>
  );
}

const handleComplete = async (project) => {
  const response = await markAsComplete(project)
  console.log(response)
}
function ProjectCard({ project }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleEntryClick = (entryId) => {
    navigate("/editentry/" + project.id + "/" + entryId);
  };

  return (
    <Card variant="outlined" sx={project.completed ? styles.completeCard : styles.card}>
      {console.log(project)}


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
                <Typography variant="body2" sx={{ px: 1 }} >{entry.task}</Typography>
                <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>{entry.hours} h</Typography>
              </Box>
            ))
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
            <Button
              sx={buttonStyles.primary}
              onClick={() => navigate("/addentryform/" + project.id)}
            >
              Uusi Kirjaus
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={project.completed}
                  onChange={() => handleComplete(project)}
                />
              }
              label="Valmis" labelPlacement="start"
            />
          </Box>
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
