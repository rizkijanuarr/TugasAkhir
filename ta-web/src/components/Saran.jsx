import React, { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RoundedStar, Rating } from "@smastrom/react-rating"; // Impor Rating dari @smastrom/react-rating
import "@smastrom/react-rating/style.css"; // Impor stylesheet untuk @smastrom/react-rating

import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const SaranButton = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        style={buttonStyle}
      >
        <IoChatboxEllipsesOutline style={iconStyle} />
        Saran
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default SaranButton;

function MyVerticallyCenteredModal(props) {
  // RATING
  const [rating, setRating] = useState(0);

  // OPTION BUTTON GROUP
  const [value, setValue] = useState([1, 5]);
  const handleChange = (val) => setValue(val);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Seberapa puas Anda dengan Portal SIPEVO?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Komponen Rating */}
          <Form.Group className="mb-3" style={ratingGroupStyle}>
            <Rating
              style={{ maxWidth: 250 }}
              value={rating}
              onChange={setRating}
              itemStyles={myStyles}
            />
          </Form.Group>
          {/* KOMPONEN BUTTON GROUP */}
          <Form.Group className="mb-3" style={reviewStyles}>
            <Form.Label>
              Apa yang perlu diperbaiki dari portal SIPEVO?
            </Form.Label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ToggleButtonGroup
                type="checkbox"
                value={value}
                onChange={handleChange}
                style={{ marginBottom: "-1px" }} // Menambahkan margin bawah untuk pemisahan
              >
                <ToggleButton
                  id="tbg-btn-1"
                  value={1}
                  style={value.includes(1) ? activeStyle : disabledStyle}
                >
                  Tampilan Dashboard
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-2"
                  value={2}
                  style={value.includes(2) ? activeStyle : disabledStyle}
                >
                  Tampilan Login / Register
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-3"
                  value={3}
                  style={value.includes(3) ? activeStyle : disabledStyle}
                >
                  Kemudahan Penggunaan
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                type="checkbox"
                value={value}
                onChange={handleChange}
              >
                <ToggleButton
                  id="tbg-btn-4"
                  value={4}
                  style={value.includes(4) ? activeStyle : disabledStyle}
                >
                  Tampilan Visual
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-5"
                  value={5}
                  style={value.includes(5) ? activeStyle : disabledStyle}
                >
                  Kategori Pengaduan
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bagaimana kesan dan pengalaman Anda?</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={submitStyle} onClick={props.onHide}>
          Submit
        </Button>
        <Button style={closeStyle} onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const buttonStyle = {
  position: "fixed",
  top: "50%",
  right: "20px",
  zIndex: "1000",
  backgroundColor: "#fc6541",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "12px 12px 0 0",
  cursor: "pointer",
  transform: "translateY(-50%) rotate(-90deg)", // ROTATE
  transformOrigin: "right center", // ROTATE RIGHT
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconStyle = {
  marginRight: "8px",
};

const closeStyle = {
  backgroundColor: "#fc6541",
  color: "white",
  border: "none",
};

const submitStyle = {
  backgroundColor: "#424649",
  color: "white",
  border: "none",
};

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700", // Warna bintang saat aktif
  inactiveFillColor: "#fbf1a9", // Warna bintang saat tidak aktif
};

const ratingGroupStyle = {
  display: "flex",
  justifyContent: "center",
};

const reviewStyles = {
  display: "flex",
  flexDirection: "column",
};

// Gaya untuk tombol biasa
const disabledStyle = {
  border: "1px solid #ccc",
  backgroundColor: "transparent",
  color: "#333",
};

// Gaya untuk tombol saat aktif
const activeStyle = {
  border: "1px solid #007bff", // Warna primary Bootstrap
  backgroundColor: "#007bff",
  color: "white",
};
