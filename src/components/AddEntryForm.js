import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';

const API_URL = process.env.REACT_APP_API_URL

export default function AddEntryForm({ entry }) {

  const { projectid } = useParams();

  const [form, setForm] = useState({
    date: entry?.date ? new Date(entry.date) : new Date(), task: entry?.task || '', hours: entry?.hours || ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.task || !form.hours) {
      return
    }

    const method = entry ? 'PATCH' : 'POST'; // jos entry olemassa -> update
    const url = entry
      ? API_URL + "/projects/" + projectid + "/entries/" + entry.id
      : API_URL + "/projects/" + projectid + "/entries/"

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: form }),
    });

    if (response.ok) {
      navigate(-1); // palaa edelliseen
    } else {
      console.error('Virhe tallennettaessa entryä');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Haluatko varmasti poistaa tämän kirjauksen?")) return;

    const response = await fetch(API_URL + "/projects/" + projectid + "/entries/" + entry.id, {
      method: 'DELETE',
    });

    if (response.ok) {
      navigate(-1)
    } else {
      console.error("Entryn poisto epäonnistui");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={styles.mainBox}>
        <Typography variant="h6" fontWeight="bold">Lisää kirjaus</Typography>

        <DatePicker
          label="Päivämäärä"
          value={form.date}
          onChange={(newValue) => setForm({ ...form, date: newValue })}
          renderInput={(params) => <TextField {...params} size="small" />}
        />

        <TextField name="task" label="Tehtävä" size="small" value={form.task} onChange={handleChange} />

        <TextField name="hours" label="Tunnit" size="small" type="number" value={form.hours} onChange={handleChange} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button type="submit" sx={buttonStyles.primary}>Tallenna</Button>
          <Button sx={buttonStyles.critical} onClick={handleDelete}>Poista</Button>
          <Button sx={buttonStyles.secondary} onClick={() => navigate(-1)}>Takaisin</Button>
        </Box>
      </Box>
    </LocalizationProvider>

  );
}
