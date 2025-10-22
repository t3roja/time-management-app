import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return window.alert("Täytä kaikki kentät");

    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          password_confirmation: form.password,
          confirm_success_url: "http://localhost:3000/home"
        }),
      });

      if (response.ok) {
        window.alert("Tili luotu onnistuneesti!");
        navigate('/login');
      } else {
        const data = await response.json();
        window.alert(data.errors?.[0] || "Rekisteröinti epäonnistui");
      }
    } catch (err) {
      console.error(err);
      window.alert("Verkkovirhe rekisteröinnissä");
    }
  };

  return (
    <Box component="form" sx={styles.mainBox} onSubmit={handleSubmit}>
      <Typography variant="h6" fontWeight="bold">Luo uusi tili</Typography>

      <TextField name="email" label="Sähköposti" size="small" value={form.email} onChange={handleChange} />
      <TextField name="password" label="Salasana" type="password" size="small" value={form.password} onChange={handleChange} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button type="submit" sx={buttonStyles.primary}>Rekisteröidy</Button>
        <Button onClick={() => navigate('/login')} sx={buttonStyles.secondary}>Takaisin kirjautumiseen</Button>
      </Box>
    </Box>
  );
}
