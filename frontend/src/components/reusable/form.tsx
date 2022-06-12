import * as React from "react";
import Joi from "joi";
import Input from "./input";
import CheckBox from "./checkbox";
import SubmitButton from "./submitButton";
import { toast } from "react-toastify";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../../css/form.css";

interface FormProps {}

interface FormState {
  data: any;
  errors: object;
}

class Form extends React.Component<FormProps, FormState> {
  state: Readonly<FormState> = { data: {}, errors: {} };
  schema = Joi.object();

  validateProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errors: any = {};
    let value;
    const { id, type } = e.currentTarget;
    const subSchema = this.schema.extract(id);

    if (type === "checkbox") {
      value = e.currentTarget.checked;
    } else {
      value = e.currentTarget.value;
    }

    try {
      Joi.assert(value, subSchema);
    } catch (results: any) {
      results.details.map((result: any) => (errors[id] = result.message));
      toast.warn(errors[id], {
        className: "toast-bg",
      });
    }

    if (Object.keys(errors).length === 0 && id.includes("repeat")) {
      const idArray = id.split("_");
      if (this.state.data[idArray[1]] != this.state.data[id]) {
        errors[id] = `Repeat ${idArray[1]} should be the same.`;
        toast.warn(errors[id], {
          className: "toast-bg",
        });
      }
    }

    this.setState({ errors: errors || {} });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...this.state.data };
    if (e.currentTarget.type === "checkbox") {
      data[e.currentTarget.id] = e.currentTarget.checked;
    } else {
      data[e.currentTarget.id] = e.currentTarget.value;
    }
    this.setState({ data });
  };

  validate = (): object | null => {
    const errors: any = {};
    const options = { abortEarly: false };
    const { data } = this.state;

    try {
      Joi.assert(data, this.schema, options);
    } catch (results: any) {
      results.details.map(
        (result: any) => (errors[result.path[0]] = result.message)
      );
      return errors;
    }

    Object.keys(data).forEach(function (key) {
      if (key.includes("repeat")) {
        const idArray = key.split("_");
        if (data[idArray[1]] != data[key]) {
          errors[key] = `Repeat ${idArray[1]} should be the same.`;
        }
      }
    });

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState(errors || {});
    if (errors) return;

    this.doSubmit();
  };

  doSubmit = () => {};

  renderInput(
    id: string,
    label: string,
    icon: IconProp,
    type: string = "text"
  ) {
    return (
      <Input
        value={this.state.data[id]}
        onChange={(e) => this.handleChange(e)}
        id={id}
        label={label}
        icon={icon}
        type={type}
        onBlur={(e) => this.validateProperty(e)}
      />
    );
  }

  renderCheckBox(id: string, label: string) {
    return (
      <CheckBox
        id={id}
        label={label}
        value={this.state.data[id]}
        onChange={(e) => {
          this.handleChange(e);
          this.validateProperty(e);
        }}
      />
    );
  }

  renderSubmit(label: string) {
    return <SubmitButton value={label} errors={this.validate()} />;
  }
}

export default Form;
