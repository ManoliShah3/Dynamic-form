import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import TextInput from "./Components/TextInput";
import axios from "axios";
import Email from "./Components/Email";
import Radio from "./Components/Radio";
import DropDown from "./Components/Dropdown";
import CalendarInput from "./Components/Calendar";
import NewsletterCheckbox from "./Components/Checkbox";
import Contact from "./Components/Contact";
import { Toast } from "primereact/toast";

export default function DynamicForm() {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [fields, setFields] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json");
        // console.log(response.data)
        setFields(response.data);
      } catch (error) {
        console.error("Failed to load form fields:", error);
      }
    };
    fetchData();
  }, []);

  // const onSubmit = (data) => {
  //   console.log("Form submitted:", data);
  //   toast.current.show({
  //     severity: "success",
  //     detail: "Form submitted successfully",
  //     life: 3000,
  //     sticky: true,
  //   });

    // localStorage.setItem("formData", JSON.stringify(data));

    // download file in json format 
    // const jsonData = JSON.stringify(data);
    // const blob = new Blob([jsonData], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "form_data.json";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);
  // };

  const onSubmit = async (data) => {
  try {
    await axios.post("http://localhost:3000/formdata", data);
    toast.current.show({
      severity: "success",
      detail: "Form submitted successfully",
      life: 3000,
    });
  } catch (error) {
    console.error("Failed to submit form data:", error);
  }
};

  if (!fields) return <p>Loading form...</p>;

  const componentMap = {
    text: TextInput,
    email: Email,
    radio: Radio,
    dropdown: DropDown,
    date: CalendarInput,
    checkbox: NewsletterCheckbox,
  };

  return (
    <div>
      <Toast className="toast-message" ref={toast} position="top-center" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ name, label, type, rules, options }) => {
          const Component = componentMap[type];
          if (!Component) {
            return null;
          }

          return (
            <Component
              key={name}
              name={name}
              label={label}
              control={control}
              rules={rules}
              options={options}
            />
          );
        })}

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
