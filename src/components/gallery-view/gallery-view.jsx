import { Button, Col, Row, Container, Image, Form } from "react-bootstrap";
import { APP_API } from "../../constants";
import { useState } from "react";

export const GalleryView = ({ gallery, addImage }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Replace 'http://localhost:3000/upload' with your server endpoint
      const response = await fetch(`${APP_API}/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(window.location.reload(), 2000);
        console.log("File uploaded successfully:", data.message);
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h1>Upload an Image to the Gallery</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Choose Image:
              <input type="file" onChange={handleFileChange} />
            </label>

            <button type="submit">Upload File</button>
          </form>
        </Col>
      </Row>
      <div>
        {gallery.map((imageName) => {
          return <Image src={`${APP_API}/view-image/${imageName}`} rounded />;
        })}
      </div>
    </Container>
  );
};
