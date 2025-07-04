import { Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";

export default function CalendarInput({ name, label, control, rules = {} }) {
  const today = new Date();
  const maxSelectableDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const mergedRules = {
    required: "This field is required",
    validate: (value) => {
      if (!value) return true;
      return value <= maxSelectableDate || "Invalid Age";
    },
    ...rules,
  };

  return (
    <div className="form-field">
      <div className="field-row">
        <label htmlFor={name} className="form-label">{label}</label>
        <div className="input-error-row">
          <Controller
            name={name}
            control={control}
            rules={mergedRules}
            defaultValue={null}
            render={({ field, fieldState }) => (
              <>
                <Calendar
                  id={name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  showIcon
                  placeholder="Select date"
                  className={`input-box ${fieldState.error ? "p-invalid" : ""}`}
                  maxDate={maxSelectableDate}
                  showButtonBar
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
