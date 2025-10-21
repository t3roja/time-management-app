import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Card } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { buttonStyles } from '../styles/ButtonStyles';

const API_URL = process.env.REACT_APP_API_URL

export default function AddEntryForm() {
  const [form, setForm] = useState({ date: null, task: '', hours: '' });
  const { projectId } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!form.date || !form.task || !form.hours) {
      return
    }
    e.preventDefault();

    const response = await fetch(API_URL + '/projects/' + projectId + '/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: form }),
    });

    if (response.ok) {
      const newEntry = await response.json();
      setForm({ date: '', task: '', time: '', hours: '' });
      navigate(-1)
    } else {
      console.error('Virhe lisättäessä kirjausta');
    }
  };

  return (
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
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
      <Button sx={buttonStyles.primary}>Lisää</Button>
      <Button sx={buttonStyles.secondary} onClick={() => navigate(-1)}>Takaisin</Button>
    </Box>
  </Box>
</LocalizationProvider>

  );
}
