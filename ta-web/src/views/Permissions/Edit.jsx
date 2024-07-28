//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutDefault from "../../layouts/Default";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function PermissionEdit() {
  //title page
  document.title = "Edit Permissions - SIPEVO";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [name, setName] = useState("");
  const [guardName, setGuardName] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function fetchDataCategory
  const fetchDataPermissions = async () => {
    await Api.get(`/api/admin/permissions/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setName(response.data.data.name);
      setGuardName(response.data.data.guard_name);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPermissions"
    fetchDataPermissions();
  }, []);

  //function "updatePermissions"
  const updatePermissions = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("name", name);
    formData.append("guard_name", guardName);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/permissions/${id}`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/permissions");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/permissions"
              className="btn btn-md btn-tertiary border-0 shadow mb-3"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6>
                  <i className="fa fa-folder"></i> Edit Permissions
                </h6>
                <hr />
                <form onSubmit={updatePermissions}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Permissions Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Permissions Name"
                    />
                  </div>
                  {errors.name && (
                    <div className="alert alert-danger">{errors.name[0]}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Permissions Guard Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={guardName}
                      onChange={(e) => setGuardName(e.target.value)}
                      placeholder="Enter Permissions Guard Name"
                    />
                  </div>
                  {errors.guardName && (
                    <div className="alert alert-danger">
                      {errors.guardName[0]}
                    </div>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-tertiary me-2"
                    >
                      <i className="fa fa-save"></i> Update
                    </button>
                    <button type="reset" className="btn btn-md btn-warning">
                      <i className="fa fa-redo"></i> Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
