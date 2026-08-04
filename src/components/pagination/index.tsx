import React from "react";
import Pagination from "@mui/material/Pagination";
import type { PaginationProp } from "../../types/interfaces";

interface PaginationComponentProps extends PaginationProp {
  count: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  count,
  page,
  handlePageChange,
}) => {
  return (
    <Pagination
      count={count}
      page={page}
      color="primary"
      onChange={handlePageChange}
      sx={{ mt: 3, display: "flex", justifyContent: "center" }}
    />
  );
};

export default PaginationComponent;