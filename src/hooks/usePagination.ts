import React from "react";
import type { PaginationProp } from "../types/interfaces";

const UsePagination= (): PaginationProp =>{
  
    const [page, setPage] = React.useState(1); 

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>, //intentionally unused
      value: number
    ) => {
      console.log(value); //value changing
      setPage(value);
    };

return {
page,
handlePageChange

};
};

export default UsePagination;