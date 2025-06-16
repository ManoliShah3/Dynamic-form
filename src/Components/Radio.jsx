import { Controller } from "react-hook-form";
import { RadioButton } from "primereact/radiobutton";

export default function Radio({ name, label, control, options = [] }) {
  return (
    <div className="form-field">
      <div className="field-row">
        <label className="form-label">{label}</label>
        <div className="input-error-row">
          <Controller
            name={name}
            control={control}
            rules={{
              required: "Please select an option",
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <div className="radio-options">
                  {options.map((option) => (
                    <div className="flex align-items-center gap-2" key={option.value}>
                      <RadioButton
                        inputId={`${name}_${option.value}`}
                        name={name}
                        value={option.value}
                        onChange={(e) => field.onChange(e.value)}
                        checked={field.value === option.value}
                      />
                      <label htmlFor={`${name}_${option.value}`} className="text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
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
