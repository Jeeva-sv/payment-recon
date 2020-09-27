import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'checkNumber', label: 'Check Number', minWidth: 50 },
  { id: 'status', label: 'Status', minWidth: 50 },
  {
    id: 'checkNumber',
    label: 'Action',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

const rows = [
  { id: 1, checkNumber: '4589652522', status: 'PAID' },
  { id: 2, checkNumber: '4589623587', status: 'RE-ISSUE' },
  { id: 3, checkNumber: '7899452248', status: 'PAID' },
  { id: 4, checkNumber: '4589652522', status: 'PAID' },
  { id: 5, checkNumber: '4589623587', status: 'RE-ISSUE' },
  { id: 6, checkNumber: '7899452248', status: 'PAID' },
  { id: 7, checkNumber: '4589652522', status: 'PAID' },
  { id: 8, checkNumber: '4589623587', status: 'RE-ISSUE' },
  { id: 9, checkNumber: '7899452248', status: 'PAID' },
  { id: 10, checkNumber: '4589652522', status: 'PAID' },
  { id: 11, checkNumber: '4589623587', status: 'RE-ISSUE' },
  { id: 12, checkNumber: '7899452248', status: 'PAID' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 330,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function FolderList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const reissueRequest = (row) => {
    alert(row.checkNumber);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Check Number</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="Center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.checkNumber}
              </StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell align="right">
               {
                 row.status === "RE-ISSUE" ?
                 <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 onClick={()=>reissueRequest(row)}
               >
                 Re-Issue
               </Button>
               :
               null
               }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(FolderList);