import * as React from "react";
import "../../css/submitButton.css";

interface SubmitButtonProps {
  value: string;
  errors: object | null;
}

const getClassName = (errors: object | null): string => {
  if (errors === null) return "";
  return "disabled";
};

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  value,
  errors,
}) => {
  return (
    <div className="inputBox-Form">
      <div className="box">
        <label htmlFor="submit"></label>
        <input
          className={getClassName(errors)}
          name="submit"
          type="submit"
          value={value}
        />
      </div>
    </div>
  );
};

export default SubmitButton;
