import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";

export default function Email({ name, label, control }) {
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
                value: /^[\w.-]+@[\w.-]+\.\w+$/,
                message: "Invalid email format",
              },
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <InputText
                  id={name}
                  type="email"
                  placeholder="Email"
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
