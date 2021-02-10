/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { uniqueId } from 'lodash';
import { Label } from '../FormSelect/styles';

function TableRows(props) {
  // Destructuring
  const {
    row, labelId, collapsable,
  } = props;

  // Hooks
  const [open, setOpen] = useState();

  // Renders
  const renderSwitch = (tipoSolicitacao) => {
    let tipo = '';
    switch (tipoSolicitacao) {
      case 1: tipo = 'Solicitação'; break;
      case 2: tipo = 'Dúvida'; break;
      case 3: tipo = 'Incidente'; break;
      default: break;
    }
    return tipo;
  };

  const renderStatus = (status) => (status === 'I' ? 'Inativo' : 'Ativo');

  const tableCell = [];
  Object.keys(row).map((item) => {
    switch (item) {
      case 'key':
        tableCell.push(<TableCell component="td" scope="row" align="left" key={uniqueId()} id={labelId}>{row[item]}</TableCell>);
        break;
      case 'status':
        tableCell.push(<TableCell align="left" key={uniqueId()}>{renderStatus(row[item])}</TableCell>);
        break;
      default:
        tableCell.push(<TableCell align="left" key={uniqueId()}>{row[item]}</TableCell>);
        break;
    }
    return tableCell;
  });

  return (
    <>
      <TableRow hover>
        {collapsable
          && (
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
            </TableCell>
          )}
         { tableCell }
      </TableRow>
      {collapsable
        && (
          <TableRow>
            <TableCell
              key={uniqueId}
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={6}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Label className="subtitulo">
                    Subitens
                  </Label>
                  <Table size="small" aria-label="subitens">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell className="columnTitle">Nome</TableCell>
                        <TableCell className="columnTitle" align="center">Tipo</TableCell>
                        <TableCell className="columnTitle" align="center">Status</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.subitens.map((subitem) => (
                        <TableRow hover key={subitem.key}>
                          <TableCell component="th" scope="row">{subitem.nome}</TableCell>
                          <TableCell align="center">{renderSwitch(subitem.tipo)}</TableCell>
                          <TableCell align="center">{renderStatus(subitem.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
    </>

  );
}

// PropTypes
TableRows.propTypes = {
  row: PropTypes.shape({
  }).isRequired,
  labelId: PropTypes.string.isRequired,
};

export default TableRows;
