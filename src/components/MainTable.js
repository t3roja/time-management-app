import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';


export default function CollapsibleTable(props) {

  const { projects } = props

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (

      <React.Fragment>

        <TableRow
          sx={{
            '& > *': { borderBottom: 'unset' },
            cursor: 'pointer', overflowX: 'auto'
          }}
          onClick={() => setOpen(!open)}
        >

          <TableCell>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </TableCell>
          <TableCell align="left" sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>{row.name}</TableCell>
          <TableCell align="left">Projektin ID: {row.id}</TableCell>
          <TableCell align="left">Tunnit yhteensä: {row.totalHours}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography gutterBottom component="div">
                  Työtunnit
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Päivämäärä</TableCell>
                      <TableCell align="center">Tehtävä</TableCell>
                      <TableCell align="right">Aika</TableCell>
                      <TableCell align="right">Tunnit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.entries.map((entriesRow) => (
                      <TableRow key={entriesRow.id}>
                        <TableCell component="th" scope="row" align="left">
                          {entriesRow.date}
                        </TableCell>
                        <TableCell align="center">{entriesRow.task}</TableCell>
                        <TableCell align="right">{entriesRow.time}</TableCell>
                        <TableCell align="right">{entriesRow.hours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      projectId: PropTypes.number.isRequired,
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          taskId: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          task: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          hours: PropTypes.number.isRequired,
        })
      ).isRequired,
      totalHours: PropTypes.number.isRequired
    }).isRequired,
  };


  return (

    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table aria-label="collapsible table" sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Projekti</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}