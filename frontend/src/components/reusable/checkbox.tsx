import * as React from "react";
import "../../css/checkbox.css";

interface CheckBoxProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  return (
    <label htmlFor={id} className="checkbox-Form">
      <input type="checkbox" id={id} checked={value} onChange={onChange} />
      <p>{label}</p>
    </label>
  );
};

export default CheckBox;
