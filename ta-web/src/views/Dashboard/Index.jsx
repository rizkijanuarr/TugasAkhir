//import useState and useEffect
import { useState, useEffect } from "react";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutDefault from "../../layouts/Default";

export default function Dashboard() {
  //title page
  document.title = "Dashboard - SIPEVO";

  //define state
  const [countPengaduanCategories, setCountPengaduanCategories] = useState(0);
  const [countPengaduanStatus, setCountPengaduanStatus] = useState(0);
  const [countPengaduan, setCountPengaduan] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
  const [downloadPlaystore, setDownloadPlaystore] = useState(0);

  //token from cookies
  const token = Cookies.get("token");

  //method fetchData
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await Api.get("/api/admin/dashboard").then((response) => {
      //set response to state
      setCountPengaduanCategories(response.data.data.categories);
      setCountPengaduanStatus(response.data.data.pengaduan_status);
      setCountPengaduan(response.data.data.pengaduan);
      setCountUsers(response.data.data.users);
      setDownloadPlaystore(response.data.data.download_playstore);
    });
  };

  //useEffect
  useEffect(() => {
    //call method "fetchData"
    fetchData();
  }, []);

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-12 col-sm-6 col-xl-3 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="row d-block d-xl-flex align-items-center">
                  <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                    <div className="icon-shape icon-shape-info rounded me-4 me-sm-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-folder"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                      </svg>
                    </div>
                    <div className="d-sm-none">
                      <h6 className="h6">Categories</h6>
                      <h5 className="fw-extrabold mb-1">
                        {countPengaduanCategories}
                      </h5>
                    </div>
                  </div>
                  <div className="col-12 col-xl-7 px-xl-0">
                    <div className="d-none d-sm-block">
                      <h6 className="h6">Categories</h6>
                      <h5 className="fw-extrabold mb-1">
                        {countPengaduanCategories}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="row d-block d-xl-flex align-items-center">
                  <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                    <div className="icon-shape icon-shape-success rounded me-4 me-sm-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </div>
                    <div className="d-sm-none">
                      <h6 className="h6">Status</h6>
                      <h5 className="fw-extrabold mb-1">
                        {countPengaduanStatus}
                      </h5>
                    </div>
                  </div>
                  <div className="col-12 col-xl-7 px-xl-0">
                    <div className="d-none d-sm-block">
                      <h6 className="h6">Status</h6>
                      <h5 className="fw-extrabold mb-1">
                        {countPengaduanStatus}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="row d-block d-xl-flex align-items-center">
                  <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                    <div className="icon-shape icon-shape-tertiary rounded me-4 me-sm-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-image-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.631.254l-1.59 3.184-2.225-1.112a.5.5 0 0 0-.586.106L1.001 12zm12-8a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" />
                      </svg>
                    </div>
                    <div className="d-sm-none">
                      <h6 className="h6">Pengaduan</h6>
                      <h5 className="fw-extrabold mb-1">{countPengaduan}</h5>
                    </div>
                  </div>
                  <div className="col-12 col-xl-7 px-xl-0">
                    <div className="d-none d-sm-block">
                      <h6 className="h6">Pengaduan</h6>
                      <h5 className="fw-extrabold mb-1">{countPengaduan}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="row d-block d-xl-flex align-items-center">
                  <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                    <div className="icon-shape icon-shape-danger rounded me-4 me-sm-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-people-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm9-6a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM7 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0z" />
                      </svg>
                    </div>
                    <div className="d-sm-none">
                      <h6 className="h6">Users</h6>
                      <h5 className="fw-extrabold mb-1">{countUsers}</h5>
                    </div>
                  </div>
                  <div className="col-12 col-xl-7 px-xl-0">
                    <div className="d-none d-sm-block">
                      <h6 className="h6">Users</h6>
                      <h5 className="fw-extrabold mb-1">{countUsers}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-12 col-xl-12 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6 className="h6">Download Aplikasi Android :</h6>
                <div className="align-items-center justify-content-start">
                  <a href="https://vokasi.unesa.ac.id/" target="_blank">
                    <img
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=id"
                      alt="Google Play Logo"
                      style={{ width: "200px", marginRight: "10px" }}
                    />
                  </a>
                  <p className="app-title">Sistem Pengaduan Vokasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
