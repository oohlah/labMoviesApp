import React from "react";
import Typography from "@mui/material/Typography";

interface SectionHeadingProps {
  children: React.ReactNode;
}

const styles = {
  sectionHeading: {
    paddingTop: "16px",
    paddingBottom: "16px",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <Typography variant="h5" component="h2" sx={styles.sectionHeading}>
      {children}
    </Typography>
  );
};

export default SectionHeading;