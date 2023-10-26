import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenOnCapturePhase = true) {
  const selector = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (selector.current && !selector.current.contains(e.target)) handler();
    }

    document.addEventListener("click", handleClick, listenOnCapturePhase);

    return () =>
      document.removeEventListener("click", handleClick, listenOnCapturePhase);
  }, [handler, listenOnCapturePhase]);

  return { selector };
}

export default useOutsideClick;
