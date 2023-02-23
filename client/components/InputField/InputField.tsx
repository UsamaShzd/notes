import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

type InputFieldProps = {
  label: string;
  name: string;
  as?: "input" | "textarea";
};

function InputField({ label, name, as }: InputFieldProps) {
  const [field, meta] = useField({ name });

  const hasError = meta.touched && meta.error;
  return (
    <div className="mb-3">
      <Form.Label htmlFor={name} className={hasError ? "text-danger" : ""}>
        {label}
      </Form.Label>
      <Form.Control
        className="form-control"
        id={name}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value as string}
        isInvalid={!!hasError}
        as={as || "input"}
      />
      {hasError ? (
        <p className="text-danger">
          <small>{meta.error}</small>
        </p>
      ) : null}
    </div>
  );
}

export default InputField;
