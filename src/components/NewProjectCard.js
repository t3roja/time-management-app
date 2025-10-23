import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styles } from '../styles/Styles';

export default function NewProjectCard({ onClick }) {
  return (
    <Card
      variant="outlined"
      sx={{
        ...styles.card,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderStyle: 'dashed',
        opacity: 0.8,
        transition: '0.2s',
        '&:hover': { opacity: 1, borderColor: 'primary.main', boxShadow: 3 },
      }}
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
