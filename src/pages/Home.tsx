import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import { getMp3 } from "../api/api";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const validationSchema = yup.object({
  url: yup.string().required("URL is required"),
});

const Home = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const mp3 = await getMp3(values.url);

      if (audio.current != undefined) {
        // @ts-ignore
        audio.current.src = URL.createObjectURL(mp3);
        audio.current.load();
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });

  return (
    <div className="main">
      <h4>
        Wpisz poniżej adres URL linku platformy youtube.com który chcesz
        przekształcić na plik audio z rozszeżeniem .mp3
      </h4>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="url"
            name="url"
            label="Adres URL youtube.com"
            value={formik.values.url}
            onChange={formik.handleChange}
          />
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            sx={{ margin: "20px" }}
          >
            Konwertuj
          </Button>
        </form>
      </div>
      {isLoading ? <CircularProgress /> : null}
      <audio controls ref={audio}>
        Your browser does not support the audio element.
      </audio>
      {audio?.current ? (
        <a
          href={audio?.current?.src}
          download="file.mp3"
          style={{ color: "white", marginTop: "5px" }}
        >
          <Button
            size="large"
            variant="contained"
            type="submit"
            sx={{ margin: "20px" }}
          >
            <FileDownloadIcon fontSize="large" />
          </Button>
        </a>
      ) : null}
    </div>
  );
};

export default Home;
