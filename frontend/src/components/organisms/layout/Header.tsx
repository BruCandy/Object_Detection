import { Flex, Heading, Link } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useImage } from "../../../hooks/useImage";

export const Header: FC = memo(() => {
  const navigate = useNavigate();
  const { setImage } = useImage();

  const onClickHome = useCallback(() => {
    navigate("/");
    setImage(null);
  }, []);
  const onClickGallery = useCallback(() => {
    navigate("/gallery");
    setImage(null);
  }, []);

  return (
    <>
      <Flex
        as="nav"
        bg="green.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            Object Detection
          </Heading>
        </Flex>

        <Flex
          align="center"
          fontSize="ls"
          ml="auto"
          _hover={{ cursor: "pointer" }}
        >
          <Link onClick={onClickGallery}>Gallery</Link>
        </Flex>
      </Flex>
    </>
  );
});
