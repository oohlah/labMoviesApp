import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { uploadPoster } from "../../api/supabase-api";
import type { FantasyMovie} from "../../types/interfaces";

interface PosterUploadProps {
  control: Control<FantasyMovie>;
}

const PosterUpload: React.FC<PosterUploadProps> = ({ control }) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const imageSelectedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };


  const fileUploadHandler = async () => {

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    try {
      const uploadedPath = await uploadPoster(selectedFile);
      return uploadedPath;

    } catch(error) {
      console.error("Failed to upload poster:", error);
    }
  };


  return (
    <Controller
      name="poster_path"
      control={control}
      defaultValue=""
      render={({ field: { onChange } }) => (

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >

          <input
            type="file"
            accept="image/*"
            onChange={imageSelectedHandler}
          />

          <Button
            onClick={async () => {

              const uploadedPath = await fileUploadHandler();

              if (uploadedPath) {
                onChange(uploadedPath);
              }

            }}
            variant="contained"
          >
            Upload Movie Poster
          </Button>

        </Box>
      )}
    />
  );
};

export default PosterUpload;