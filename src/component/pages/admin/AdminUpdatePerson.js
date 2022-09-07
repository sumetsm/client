import React, { useState, useEffect } from "react";
import AdminNav from "../../layout/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPerson, readPerson ,updatePerson} from "../../functions/person";
import { useParams ,useNavigate} from "react-router-dom";
const AdminUpdatePerson = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
    const navigate = useNavigate();
  useEffect(() => {
    loadPerson(id, user.token);
  }, []);

  const loadPerson = (id, authtoken) => {
    readPerson(id, authtoken)
      .then(res => {
        setName(res.data.name);
      })
      .catch(err => {
        toast.error(err);
        console.log(err);
      });
  };
  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updatePerson({ name },id, user.token)
      .then(res => {
        setLoading(false);
        toast.success("Update ' " + res.data.name + " ' Success");
        navigate('/admin/create-person')
      })
      .catch(err => {
        setLoading(false);
        toast.err(err.response);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h4>Admin UpdatePerson</h4>}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder="Name"
                autoFocus
                required
                onChange={e => setName(e.target.value)}
              />
            </div>
            <button className="btn btn-outline-primary">UPDATE</button>
          </form>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default AdminUpdatePerson;
