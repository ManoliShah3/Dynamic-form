import { Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";

export default function DropDown({ name, label, control, options = [] }) {
  return (
    <div className="form-field">
      <div className="field-row">
        <label htmlFor={name} className="form-label">{label}</label>
        <Controller
          name={name}
          control={control}
          rules={{
            required: "Please select a value",
          }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <div className="input-error-row">
              <Dropdown
                id={name}
                value={field.value}
                options={options}
                onChange={(e) => field.onChange(e.value)}
                placeholder="Select an option"
                optionLabel="label"
                optionValue="value"
                className={`input-box ${fieldState.error ? "p-invalid" : ""}`}
              />
              <small className="inline-error">
                {fieldState.error?.message || "\u00A0"}
              </small>
            </div>
          )}
        />
      </div>
    </div>
  );
}
