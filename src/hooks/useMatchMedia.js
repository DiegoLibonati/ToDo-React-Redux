import { useEffect, useMemo, useState } from "react";

export function useMediaQuery(mediaQueryString) {
  const queryString = removeReservedMediaKeyWord(mediaQueryString);
  const query = useMemo(() => window.matchMedia(queryString), [queryString]);
  const [matches, setMatches] = useState(query.matches);

  useEffect(() => {
    const listener = (e) => setMatches(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, [query]);
  return { matches };
}

function removeReservedMediaKeyWord(mediaQueryString) {
  return mediaQueryString.replace("@media", "").trim();
}
