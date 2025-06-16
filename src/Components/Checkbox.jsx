import { Controller } from "react-hook-form";
import { Checkbox } from "primereact/checkbox";

export default function NewsletterCheckbox({ name, label, control, rules = {} }) {
  return (
    <div className="form-field">
      <div className="field-row">
        <div className="input-error-row">
          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={false}
            render={({ field, fieldState }) => (
              <>
                <Checkbox
                  inputId={name}
                  onChange={(e) => field.onChange(e.checked)}
                  checked={field.value}
                />
                <label htmlFor={name} style={{ marginLeft: "12px", fontWeight: "450" }}>
                  {label}
                </label>
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
