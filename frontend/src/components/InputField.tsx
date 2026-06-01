import React from "react";

interface InputFieldProps {
  type: string;
  label: string;
  prompt: string;
  name: string;
  value: string;
  required?: boolean;
  min?: number;
  rows?: number;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export function InputField(props: InputFieldProps) {
  // supported input types for the input element
  const INPUTS = ["text", "number", "date", "email", "password"];

  // validate element and type
  const type = props.type.toLowerCase();
  const isTextarea = type === "textarea";
  const required = props.required || false;

  // kontrola validnosti typu
  if (!isTextarea && !INPUTS.includes(type)) {
    return null;
  }

  // assign minimum value to the appropriate attribute type
  const minProp = props.min || null;
const min = ["number", "date"].includes(type) ? minProp ?? undefined : undefined;
const minlength = ["text", "textarea"].includes(type) ? minProp ?? undefined : undefined;

  // vykreslení skupiny formuláře s labelem
  return (
    <div className="form-group">
      <label>{props.label}:</label>

      {/* vykreslení aktuálního elementu */}
      {isTextarea ? (
        <textarea
          required={required}
          className="form-control"
          placeholder={props.prompt}
          rows={props.rows}
          minLength={minlength}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      ) : (
        <input
          required={required}
          type={type}
          className="form-control"
          placeholder={props.prompt}
          minLength={minlength}
          min={min}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.onBlur}
        />
      )}
    </div>
  );
}
// exportování komponenty InputField

export default InputField;
