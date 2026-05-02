import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router";
import { useRegistrationMutation } from "../services/api";

const Registration = () => {
  const [registerUser] = useRegistrationMutation();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const res = await registerUser(form);
    if (res.error) {
      const field = res.error.data.field;
      if (field == "email") return setErrors({ email: res.error.data.message });
      if (field == "fullName")
        return setErrors({ fullName: res.error.data.message });
      if (field == "password")
        return setErrors({ password: res.error.data.message });
    }
    console.log("Registration successfully");
    
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col rounded-xl shadow space-y-4 max-w-md mx-auto p-6 w-full"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Create an account
        </h2>

        <Input
          label="Full Name"
          value={form.fullName}
          onChange={handleChange("fullName")}
          placeholder="John Doe"
          error={errors.fullName}
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="example@email.com"
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          placeholder="••••••••"
          error={errors.password}
        />

        <Button type="submit" fullWidth>
          Register
        </Button>
        <p className="ml-auto">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;