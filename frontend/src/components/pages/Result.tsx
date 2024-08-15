import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { useImage } from "../../hooks/useImage";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const Result: React.FC = () => {
  const { image } = useImage();
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/");
  };

  if (!image) {
    return (
      <VStack spacing={5} align="center">
        <Text fontSize="3xl" mb={0}>
          画像がありません
        </Text>
        <PrimaryButton onClick={onClickBack}>戻る</PrimaryButton>
      </VStack>
    );
  }

  return (
    <VStack spacing={5} align="center">
      <Text fontSize="3xl" mb={0}>
        検出結果
      </Text>
      <Box
        boxSize="sm"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={image}
          alt="Uploaded result"
          objectFit="cover" // 画像の表示方法を調整
          width="100%"
          height="100%"
        />
      </Box>
      <PrimaryButton onClick={onClickBack}>戻る</PrimaryButton>
    </VStack>
  );
};
