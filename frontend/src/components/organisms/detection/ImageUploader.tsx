import React, { useState } from "react";
import { Input, VStack, Spinner, Image, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useImage } from "../../../hooks/useImage";

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setImage } = useImage();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/detect",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
          }
        );
        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
        navigate("/result");
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center">
      <Input type="file" onChange={handleFileChange} />
      {file ? (
        <Box
          boxSize="sm"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={URL.createObjectURL(file)}
            alt="Dan Abramov"
            objectFit="cover" // 画像の表示方法を調整
            width="100%"
            height="100%"
          />
        </Box>
      ) : (
        <>
          <Text>画像を選択してください</Text>
          <Image
            src="gibbresh.png"
            fallbackSrc="https://via.placeholder.com/300"
          />
        </>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <PrimaryButton onClick={handleUpload}>Upload</PrimaryButton>
      )}
    </VStack>
  );
};

export default ImageUploader;
