import * as React from "react";
import Form from "./reusable/form";
import Joi from "joi";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

interface LoginFormProps {}

interface LoginFormState {
  data: { email: string; password: string; remember: boolean };
  errors: object;
}

class LoginForm extends Form {
  state: Readonly<LoginFormState> = {
    data: { email: "", password: "", remember: false },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email")
      .required(),
    password: Joi.string().min(5).max(30).label("Password").required(),
    remember: Joi.boolean(),
  });

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
  };

  render(): React.ReactNode {
    return (
      <div className="formContainer">
        <div className="form">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <h3>Log In</h3>
            {this.renderInput("email", "Email*", faUser)}
            {this.renderInput("password", "Password*", faLock, "password")}
            {this.renderCheckBox("remember", "Remember Me")}
            {this.renderSubmit("Log in")}
            <div className="linkContainer">
              <Link to="/forgetPassword" className="link">
                Forget Password
              </Link>
              <Link to="/register" className="link">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
