import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';
import { fetchUsers } from '../helpers/Api';

const API_URL = process.env.REACT_APP_API_URL;

export default function AddProjectForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', user_id: '' });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
        const data = await fetchUsers()
        setUsers(data)
    }

    getUsers();
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.user_id) return;

    try {
      const response = await fetch(API_URL + '/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
        body: JSON.stringify({ project: form }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.errors?.join(', ') || 'Virhe luodessa projektia');
        return;
      }

      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Virhe yhteydessä palvelimeen');
    }
  };

  return (
    <Box component="form" sx={styles.mainBox} onSubmit={handleSubmit}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Uusi Projekti
      </Typography>

      <TextField
        name="name"
        label="Projektin nimi"
        value={form.name}
        onChange={handleChange}
        size="small"
        fullWidth
      />

      <TextField
        select
        name="user_id"
        label="Käyttäjä"
        value={form.user_id}
        onChange={handleChange}
        size="small"
        fullWidth
        sx={{ mt: 2 }}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.email}
          </MenuItem>
        ))}
      </TextField>

      {error && (
        <Typography variant="body2" color="error" mt={1}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button type="submit" sx={buttonStyles.primary}>
          Lisää
        </Button>
        <Button sx={buttonStyles.secondary} onClick={() => navigate(-1)} ml={1}>
          Peruuta
        </Button>
      </Box>
    </Box>
  );
}
