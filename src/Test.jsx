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

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
     toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Form submitted successfully",
      life: 3000,
    });
  };

  if (!fields) return <p>Loading form...</p>;

  const componentMap = {
    text: TextInput,
    // email: Email,
    // contact: Contact,
    // radio: Radio,
    // dropdown: DropDown,
    // date: CalendarInput,
    // checkbox: NewsletterCheckbox,
   
  };

  return (
    <div>
     <Toast className="toast-message" ref={toast}  position="top-center"/>
    <form className ="form" onSubmit={handleSubmit(onSubmit)}>
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

      <button className="submit" type="submit">Submit</button>
    </form>
    </div>
  );
}
