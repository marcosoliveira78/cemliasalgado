/* eslint-disable react/prop-types */
import React from 'react';
import { FormGroup, Selecty, Label } from './styles';

function FormSelect({
  id, label, value, options, name, onChange,
  isDisabled, menuPlacement, autoFocus,
}) {
  return (
    <FormGroup>
      <Label.Text>
        {label}
      </Label.Text>
      <Selecty
        id={id}
        options={options}
        isOptionDisabled={(option) => option.disabled === 'yes'}
        value={options.filter((o) => o.value === value)}
        onChange={onChange}
        name={name}
        placeholder="Selecione..."
        isDisabled={isDisabled}
        menuPlacement={menuPlacement}
        autoFocus={autoFocus}
      />
    </FormGroup>
  );
}

export default FormSelect;
