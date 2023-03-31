import { useState } from "react";

export const useQueryData = <T>(initialState: T) => {
  const [queryData, setQueryData] = useState(initialState);

  const setData = (data: T) => {
    setQueryData(data);
  };

  const clean = () => {
    setQueryData(initialState);
  };

  return { data: queryData, setData, clean };
};
