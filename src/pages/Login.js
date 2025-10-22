import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { buttonStyles } from '../styles/ButtonStyles';
import { styles } from '../styles/Styles';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      window.alert("Täytä sähköposti ja salasana");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        window.alert("Kirjautuminen onnistui!");
        navigate('/home');
      } else {
        const data = await response.json();
        window.alert(data.errors?.[0] || "Virheellinen sähköposti tai salasana");
      }
    } catch (err) {
      console.error(err);
      window.alert("Yhteysvirhe — tarkista palvelin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" sx={styles.mainBox} onSubmit={handleSubmit}>
      <Typography variant="h6" fontWeight="bold">
        Kirjaudu sisään
      </Typography>

      <TextField
        name="email"
        label="Sähköposti"
        size="small"
        fullWidth
        margin="normal"
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Salasana"
        type="password"
        size="small"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={handleChange}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button type="submit" sx={buttonStyles.primary} disabled={loading}>
          {loading ? "Kirjaudutaan..." : "Kirjaudu"}
        </Button>

        <Button
          onClick={() => navigate('/register')}
          sx={buttonStyles.secondary}
        >
          Luo uusi tili
        </Button>
      </Box>
    </Box>
  );
}
