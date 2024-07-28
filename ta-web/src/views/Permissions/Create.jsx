//import react
import { useState } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutDefault from "../../layouts/Default";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function PermissionCreate() {
  //title page
  document.title = "Create Permissions - SIPEVO";

  //navigata
  const navigate = useNavigate();

  //define state for form
  const [name, setName] = useState("");
  const [guardName, setGuardName] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storePermissions"
  const storePermissions = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("name", name);
    formData.append("guard_name", guardName);

    //sending data
    await Api.post("/api/admin/permissions", formData, {
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
                  <i className="fa fa-folder"></i> Create Permissions
                </h6>
                <hr />
                <form onSubmit={storePermissions}>
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
                      <i className="fa fa-save"></i> Save
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
