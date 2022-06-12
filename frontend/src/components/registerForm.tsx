import * as React from "react";
import Form from "./reusable/form";
import Joi from "joi";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

interface RegisterFormProps {}

interface RegisterFormState {
  data: {
    username: string;
    email: string;
    password: string;
    repeat_password: string;
    terms: boolean;
  };
  errors: object;
}

class RegisterForm extends Form {
  state: Readonly<RegisterFormState> = {
    data: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
      terms: false,
    },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().label("Username").required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email")
      .required(),
    password: Joi.string().min(5).max(30).label("Password").required(),
    repeat_password: Joi.string()
      .min(5)
      .max(30)
      .label("Repeat password")
      .required(),
    terms: Joi.boolean().valid(true).required().messages({
      "any.only": `Terms and conditions need to be accepted.`,
      "any.required": `"a" is a required field`,
    }),
  });

  doSubmit = () => {
    //Call the server
    console.log("Registred");
  };

  render(): React.ReactNode {
    return (
      <div className="formContainer">
        <div className="form">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <h3>Sign Up</h3>
            {this.renderInput("username", "Username*", faUser)}
            {this.renderInput("email", "Email*", faMailBulk)}
            {this.renderInput("password", "Password*", faLock, "password")}
            {this.renderInput(
              "repeat_password",
              "Repeat Password*",
              faUserLock,
              "password"
            )}
            {this.renderCheckBox("terms", "Accept Terms and Conditions")}
            {this.renderSubmit("Register")}
            <div className="linkContainer">
              <Link to="/login" className="link">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
