import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../services/api";



const Login = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(form.password)
    ) {
      newErrors.password =
        "Min 6 chars, include uppercase, lowercase & number";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({})

    const res = await loginUser(form);
    if(res.error) {
    const field = res.error.data.field;
    if(field == "email") return setErrors ({ email: res.error.data.message });
    if(field == "password") return setErrors ({ password: res.error.data.message });
   }
   
  setTimeout(() => {
    navigate("/");
  }, 1000);

    try {
      setLoading(true);

      // Simulate API call
      if (onSubmit) {
        await onSubmit(form);
      } else {
        console.log("Submitted:", form);
      }

      // Reset form
      setForm({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md max-auto p-6 bg-sky-500 shadow space-y-4 rounded-xl w-full"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Login your account
        </h2>

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder=""
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder=""
          error={errors.password}
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-2"
        >
         Login
        </Button>
        <p className="ml-auto">Don't have an account? <Link to="/registration" className="text-blue-800">Registration</Link></p>
      </form>
    </div>
  );
};

export default Login;