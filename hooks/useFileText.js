import { useEffect, useState } from "react";

export const useFileText = file => {
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return [value, setValue];
};
