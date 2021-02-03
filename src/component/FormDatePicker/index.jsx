/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
import { FormFieldWrapper, Label, DatePicker } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

function FormDataPicker({
  label, name, value, onChange,
  selected,
}) {
  const fieldId = `id_${name}`;
  // const hasValue = value ? Boolean(value.length) : false;

  return (
    <FormFieldWrapper>
      <Label htmlFor={fieldId}>
        <DatePicker
        // hasValue={hasValue}
        selected={selected}
        onChange={onChange} />
        <Label.Text>
          {label}
          :
        </Label.Text>
      </Label>
    </FormFieldWrapper>
  );
}

FormDataPicker.defaultProps = {
  label: 'DatePicker',
  value: '',
  onChange: () => { },
};

FormDataPicker.propTypes = {
  // name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormDataPicker;
