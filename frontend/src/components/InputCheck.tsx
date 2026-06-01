interface InputCheckProps {
  type: string;
  checked: boolean;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}


export function InputCheck(props: InputCheckProps) {
  // supported input types for the input element
  const INPUTS = ["checkbox", "radio"];

  // validate type
  const type = props.type.toLowerCase();
  // checked value
  const checked = props.checked || false;

  // check type validity
  if (!INPUTS.includes(type)) {
    return null;
  }

  // render check form group
  return (
    <div className="form-group form-check">
      <label className="form-check-label">
        {/* vykreslení s aktuálním typem */}
        <input
          type={props.type}
          className="form-check-input"
          name={props.name}
          value={props.value}
          checked={checked}
          onChange={props.handleChange}
        />{" "}
        {props.label}
      </label>
    </div>
  );
}

// export InputCheck component
export default InputCheck;
