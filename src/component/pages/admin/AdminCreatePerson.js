import React, { useState, useEffect } from "react";
import AdminNav from "../../layout/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Avatar, Image, Progress } from "antd";
import {
  createPerson,
  getPerson,
  removePerson,
  updatePerson,
} from "../../functions/person";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const AdminCreatePerson = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState([]);
  const [filename, setFilename] = useState("Choose File...");
  const [file, setFile] = useState("");
  const [uploadPerscenTage, setUploadPerscenTage] = useState(0);

  useEffect(() => {
    loadPerson(user.token);
    console.log(person);
  }, []);
  const loadPerson = authtoken => {
    getPerson(authtoken)
      .then(res => {
        console.log(res.data);
        setPerson(res.data);
      })
      .catch(err => {
        toast.error(err);
        console.log(err);
      });
  };
  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    createPerson(formData, user.token, setUploadPerscenTage)
      .then(res => {
        setFilename("Choose File...");
        setName("");
        setUploadPerscenTage(0);
        loadPerson(user.token);
        setLoading(false);
        toast.success("Create ' " + res.data.name + " ' Success");
      })
      .catch(err => {
        setLoading(false);
        toast.err(err.response);
      });
  };
  const handleRemove = id => {
    console.log(id);
    if (window.confirm("Are you sure to Delete")) {
      setLoading(true);
      removePerson(id, user.token)
        .then(res => {
          loadPerson(user.token);
          setLoading(false);
          toast.success("Remove ' " + res.data.name + " ' Success");
        })
        .catch(err => {
          setLoading(false);
          toast.err(err.response);
        });
    }
  };
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "File",
      render: record => (
        <>
           <Avatar src={`http://localhost:8000/uploads/${record.pic}`}/>
        </>
      ),
    },
    {
      title: "Action",
      render: record => (
        <>
          <span
            className="btn btn-sm float-right"
            onClick={() => {
              console.log(record._id);
              handleRemove(record._id);
            }}
          >
            <DeleteOutlined className="text-danger" />
          </span>
          <Link to={"/admin/update-person/" + record._id}>
            {" "}
            <span className="btn btn-sm float-right">
              <EditOutlined className="text-warning" />
            </span>
          </Link>
        </>
      ),
    },
    
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h1>{uploadPerscenTage}</h1>
          {loading ? <h4>Loading...</h4> : <h4>Admin CreatePerson</h4>}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                autoFocus
                required
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                onChange={e => {
                  setFile(e.target.files[0]);
                  setFilename(e.target.files[0].name);
                }}
              />
              <label className="custom-file-label" htmlFor="customfile">
                {filename}
              </label>
            </div>
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={uploadPerscenTage}
            />
            <button className="btn btn-outline-primary">CREATE</button>
          </form>
          <hr />
          <Table columns={columns} dataSource={person} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePerson;
