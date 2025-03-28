import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import backgroundImage from "../assets/man.jpg"; // Import your image

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://nasaapplication-production.up.railway.app/api/v1/user/register",
        {
          ...values,
          role: userRole,
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Registration successful");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
            Register Form
          </h1>
          <Form.Item label="Name" name="name">
            <Input
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              type="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </Form.Item>

          <Link
            to="/login"
            className="block text-center mt-2 text-blue-500 hover:text-blue-700"
          >
            Already a user? Login here
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
            type="submit"
          >
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
