/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import Switch from 'react-switch';
import { FormGroup, Label } from '../FormSelect/styles';

const FormSwitch = ({ name, checked, label, getValue }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const checkItem = () => {
    getValue(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <FormGroup>
      <Label.Text>
        {label}
      </Label.Text>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Label>
          Inativo
        </Label>
        <Switch
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          onChange={checkItem}
          checked={isChecked}
          name={name}
          onColor="#cf8c34"
          offColor="#c5c5c5" />
        <Label>
          Ativo
        </Label>
      </div>
    </FormGroup>
  );
};

export default FormSwitch;
