/* eslint-disable react/prop-types */
import React from 'react';
import { FormGroup, Selecty, Label } from './styles';

function FormSelect({
  label, value, options, name, onChange, menuPlacement,
}) {
  return (
    <FormGroup>
      <Label.Text>
        {label}
      </Label.Text>
      <Selecty
        options={options}
        value={options.filter((o) => o.value === value)}
        onChange={onChange}
        name={name}
        placeholder="Selecione..."
        menuPlacement={menuPlacement}
      />
    </FormGroup>
  );
}

export default FormSelect;
