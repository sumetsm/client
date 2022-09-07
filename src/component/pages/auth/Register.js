import { Divider } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
// Functions
import { registerHandler } from "../../functions/auth";

const Register = ({ history }) => {
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    name: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);

  const { name, password, password2 } = formData;
  const onChange = e => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
    console.log(name);
    console.log(password);
    console.log(password2);
  };
  const onSubmit = e => {
    setLoading(true);
    e.preventDefault();
    if (password !== password2) {
      console.log("not match");
      toast.error("password not match");
      setLoading(false);
    } else {
      const newUser = {
        name,
        password,
      };
      // for security
      registerHandler(newUser)
        .then(res => {
          console.log(res.data);
          toast.success("Register Complete");
          navigate("/");
        })
        .catch(err => {
          console.log("catch");
          console.log(err.response.data);
          toast.error(err.response.data.msg);
        });
    }
  };
  console.log(process.env.REACT_APP_API);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h1>Register</h1> : <h1>Loading...</h1>}
          <form onSubmit={e => onSubmit(e)}>
            <input
              className="form-control"
              type="text"
              name="name"
              autoFocus
              placeholder="Username"
              onChange={e => onChange(e)}
            />
            <input
              className="form-control"
              type="password"
              name="password"
              autoFocus
              placeholder="password"
              onChange={e => onChange(e)}
            />
            <input
              className="form-control"
              type="password"
              name="password2"
              autoFocus
              placeholder="confirm password"
              onChange={e => onChange(e)}
            />
            <button
              className="btn btn-success"
              type="submit"
              disabled={password.length < 2}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
