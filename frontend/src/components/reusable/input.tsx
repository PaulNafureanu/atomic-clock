import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../../css/input.css";

interface InputProps {
  label: string;
  icon: IconProp;
  type?: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  label,
  icon,
  type = "text",
  value,
  id,
  onChange,
  onBlur,
}) => {
  return (
    <div className="inputBox-Form">
      <span>{label}</span>
      <div className="box">
        <div className="icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <label htmlFor={id} />
        <input
          onChange={onChange}
          value={value}
          id={id}
          type={type}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export default Input;
