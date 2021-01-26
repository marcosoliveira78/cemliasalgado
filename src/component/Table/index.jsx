import React, { useEffect, useState } from 'react';
import { Paper, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core';
import { Table } from 'react-bootstrap';
import { uniqueId } from 'lodash';
import TableHeader from '../TableHeader';
import TableRows from '../TableRows';

// Ordering Functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Main Function
function Tables(props) {
  // Destructuring
  const {
    headCells, rows, collapsable,
  } = props;

  // Hooks
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('ordem');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handles
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Triggers
  useEffect(() => {
    if (collapsable) {
      setOrderBy('grupo');
    } else {
      setOrderBy('ordem');
    }
  }, [collapsable]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rowsPerPage]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  if (page > Math.floor(rows.length / rowsPerPage)) {
    setPage(Math.floor(rows.length / rowsPerPage));
  }
  return (
    <>
      <Paper className="paper">
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="normalTable"
          >
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              collapsable={collapsable}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `normal-table-${index}-${row.key}`;

                  return (
                    <TableRows
                      labelId={labelId}
                      row={row}
                      hover
                      tabIndex={-1}
                      collapsable={collapsable}
                      key={`${row.key}-${uniqueId}`}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 13 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, { value: rows.length, label: 'Todas' }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página"
        />
      </Paper>
    </>
  );
}

export default Tables;
