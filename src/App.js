import "./App.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [image, setImage] = useState({ file: "", imagePreviewUrl: "" });
  const [loading, setLoading] = useState("Please choose a file");
  const [result, setResult] = useState("");

  const handleToonify = () => {
    // console.log(product)
    var newImage = {
      src_img: image.imagePreviewUrl,
    };
    console.log(newImage);
    setLoading("Waiting...");
    axios({
      method: "post",
      url: "http://9b5de87f3ba7.ngrok.io/toonify",
      data: newImage,
    })
      .then((response) => {
        setLoading("");
        setResult(
          ["data:image/jpeg;base64,", response.data.result_img].join(" ")
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUploadClick = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLoading("Click the button to toonify");
      setResult("");
      setImage({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
  };

  let { imagePreviewUrl } = image;

  return (
    <div
      style={{
        backgroundImage: `url("https://image.freepik.com/free-vector/colorful-memphis-design-background-vector_53876-85181.jpg")`,
        minHeight: "100vh",
      }}
      className=" d-flex align-items-center"
    >
      <Container
        style={{
          backgroundColor: "white",
          minWidth: "80vw",
        }}
      >
        <Row className="justify-content-center">
          <h2 className="mt-5">
            <strong>😎😎😎 WELCOME TO TOONIFY YOURSELF 😎😎😎</strong>
          </h2>
        </Row>
        <Row className="justify-content-center">
          <Col
            className="d-flex flex-column form-group files justify-content-center mt-5"
            xs={5}
          >
            <Card className="mt-5 w-75 align-self-center border-0">
              <img className="img-fluid" src={imagePreviewUrl} />
            </Card>
          </Col>
          <Col
            className="mt-5 d-flex flex-column justify-content-center  align-items-center"
            xs={2}
          >
            <input
              accept="image/*"
              className="d-none"
              type="file"
              id="contained-button-file"
              onChange={handleUploadClick}
            />
            <Button variant="outline-secondary align-self-center mb-5">
              <label htmlFor="contained-button-file">Upload Your Image</label>
            </Button>
            <Button
              variant="success"
              className="py-3 px-4"
              onClick={() => handleToonify()}
            >
              Toonify
            </Button>
          </Col>
          <Col
            className="mt-5 d-flex flex-column justify-content-center "
            xs={5}
          >
            <Card className="mt-5 w-75  align-self-center border-0">
              <h5>{loading}</h5>
              <Card className="mt-5 w-75 align-self-center border-0">
                <img className="img-fluid" src={result} />
              </Card>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 px-5 pb-5">
          <h3>
            <strong>HOW TO USE</strong>
          </h3>
          <h5>
            <strong>How do I get good results?</strong>
            <br />
            The algorithm works best with high resolution images without much
            noise. Looking straight on to the camera also seem to work best.
            Something like a corporate headshot tends to work well. <br />
            <strong>Where did my glasses go? </strong>
            <br />
            Not many characters from animated films wear glasses so the model
            seems to have learnt to mostly remove them. It also has problems
            with bald people, hats, and various other things. <br />
            <strong>Do you store my photo? </strong>
            <br />
            No. We don't have a database.
            <br />
            <strong>My face wasn't found! </strong>
            <br />
            We use the open source dlib face detector to find faces, it's
            designed to pick up frontal faces but isn't perfect. <br />
          </h5>
        </Row>
      </Container>
    </div>
  );
}

export default App;
