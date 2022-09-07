import { React, useState } from "react";
import { toast } from "react-toastify";
import { loginHandler } from "../../functions/auth";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = ({ history }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFromData] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { name, password, password2 } = formData;

  const roleBaseRedirect = res => {
    console.log(res);
    if (res == "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const onChange = e => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
    console.log(name);
    console.log(password);
  };
  const onSubmit = e => {
    setLoading(true);
    e.preventDefault();
    const newUser = {
      name,
      password,
    };
    // for security
    loginHandler(newUser)
      .then(res => {
        console.log("login", res);
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        console.log(res.data.payload.user.name);
        // setLoading(false);
        // toast.success('Login Complete');
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };
  console.log(process.env.REACT_APP_API);
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h1>Login</h1> : <h1>Loading...</h1>}
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
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
