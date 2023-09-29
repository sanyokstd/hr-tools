import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export default function returnQType(id) {
  switch (id) {
    case 1:
      return <CheckBoxIcon />;
    case 2:
      return <RadioButtonCheckedIcon />;
    case 3:
      return <ArrowDropDownCircleIcon />;
    case 4:
      return <TextFieldsIcon />;
    default:
      return false;
  }
}
