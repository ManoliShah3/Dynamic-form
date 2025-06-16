import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";

export default function Contact({ name, label, control, rules }) {
  return (
    <div className="form-field">
      <div className="field-row">
        <label htmlFor={name} className="form-label">{label}</label>
        <div className="input-error-row">
          <Controller
            name={name}
            control={control}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
              },
              ...rules,
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <InputText
                  id={name}
                  placeholder={label}
                  keyfilter="int" // PrimeReact built-in to restrict to digits
                  {...field}
                  className={`input-box ${fieldState.error ? "p-invalid" : ""}`}
                />
                <small className="p-error inline-error">
                  {fieldState.error?.message || "\u00A0"}
                </small>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
