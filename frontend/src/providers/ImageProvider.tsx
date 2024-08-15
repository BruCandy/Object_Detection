import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type ImageContextType = {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
};

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

export const ImageProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [image, setImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
