import React from "react";

interface InputSelectProps {
  label: string;
  prompt: string;
  name: string;
  value: string | string[];
  multiple?: boolean;
  required?: boolean;
  items: { _id?: number, name?: string }[] | string[];
  enum?: Record<string, string>;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}


export function InputSelect(props: InputSelectProps) {
  // flag for multiple select
  const multiple = props.multiple;
  // flag for required field
  const required = props.required || false;

  // flag to mark empty value
const emptySelected = "";
  // flag for object structure of items
  const objectItems = props.enum ? false : true;

  // render form group with select
  return (
    <div className="form-group">
      <label>{props.label}:</label>
      <select
        required={required}
        className="browser-default form-select"
        multiple={multiple}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
      >
        {required ? (
          /* empty value disabled (for record edit) */
          <option disabled value={emptySelected}>
            {props.prompt}
          </option>
        ) : (
          /* empty value allowed (for list filtering) */
          <option key={0} value={emptySelected}>
            ({props.prompt})
          </option>
        )}

        {objectItems
          ? /* render items as objects from database (persons) */
(props.items as { _id?: number; name?: string }[]).map((item, index) => (
              <option key={required ? index : index + 1} value={(item as { _id?: number; name?: string })._id}>
                {item.name}
              </option>
            ))
          : /* render items as values from enum (genres) */
            props.items.map((item, index) => (
              <option key={required ? index : index + 1} value={item as string}>
                {props.enum![item as string]}
              </option>
            ))}
      </select>
    </div>
  );
}

// export InputSelect component
export default InputSelect;
