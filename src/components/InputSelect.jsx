import React from "react";

export function InputSelect(props) {
  // flag for multiple select
  const multiple = props.multiple;
  // flag for required field
  const required = props.required || false;

  // flag to mark empty value
  const emptySelected = multiple ? props.value?.length === 0 : !props.value;
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
            props.items.map((item, index) => (
              <option key={required ? index : index + 1} value={item._id}>
                {item.name}
              </option>
            ))
          : /* render items as values from enum (genres) */
            props.items.map((item, index) => (
              <option key={required ? index : index + 1} value={item}>
                {props.enum[item]}
              </option>
            ))}
      </select>
    </div>
  );
}

// export InputSelect component
export default InputSelect;
