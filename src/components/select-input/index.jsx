import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { PropTypes } from 'prop-types';

const SelectInput = ({ name, list = [], value, onChange, label, id }) => (
  <FormControl fullWidth>
    <InputLabel id={`label${id}`}>{label}</InputLabel>
    <Select
      name={name}
      labelId={`label${id}`}
      id={id}
      label={label}
      value={value}
      onChange={onChange}
    >
      {list.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  list: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectInput;
