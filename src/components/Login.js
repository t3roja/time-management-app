import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Täytä kaikki kentät");

    try {
      const response = await fetch(`${API_URL}/auth/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("Kirjautuminen onnistui!");
        navigate('/home');
      } else {
        const data = await response.json();
        toast.error(data.errors?.[0] || "Virheellinen sähköposti tai salasana");
      }
    } catch (err) {
      console.error(err);
      toast.error("Verkkovirhe kirjautuessa");
    }
  };

  return (
    <Box component="form" sx={styles.mainBox} onSubmit={handleSubmit}>
      <Typography variant="h6" fontWeight="bold">Kirjaudu sisään</Typography>

      <TextField name="email" label="Sähköposti" size="small" value={form.email} onChange={handleChange} />
      <TextField name="password" label="Salasana" type="password" size="small" value={form.password} onChange={handleChange} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button type="submit" sx={buttonStyles.primary}>Kirjaudu</Button>
        <Button onClick={() => navigate('/register')} sx={buttonStyles.secondary}>Luo uusi tili</Button>
      </Box>
    </Box>
  );
}
