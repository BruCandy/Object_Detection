import { Page404 } from "../components/pages/Page404";
import { Route, Routes } from "react-router-dom";
import { Gallery } from "../components/pages/Gallery";
import { Home } from "../components/pages/Home";
import { HeaderLayout } from "../components/templates/HeaderLayout";
// import { Detection } from "../components/pages/Detection";
import { Result } from "../components/pages/Result";
import { ImageProvider } from "../providers/ImageProvider";

export const Router = () => {
  return (
    <ImageProvider>
      {" "}
      <Routes>
        <Route
          path="/"
          element={
            <HeaderLayout>
              <Home />
            </HeaderLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <HeaderLayout>
              <Gallery />
            </HeaderLayout>
          }
        />
        {/* <Route path="/detection" element={<Detection />} /> */}
        <Route
          path="/result"
          element={
            <HeaderLayout>
              <Result />
            </HeaderLayout>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ImageProvider>
  );
};
