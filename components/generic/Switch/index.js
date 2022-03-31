import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function SwitchWithLabel({ label, isChecked, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={isChecked} onChange={handleChange} />}
        label={label}
      />
    </FormGroup>
  );
}
