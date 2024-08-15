import { useContext } from "react";
import { ImageContext, ImageContextType } from "../providers/ImageProvider";

export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
