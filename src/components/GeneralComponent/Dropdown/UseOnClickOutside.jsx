import { useEffect } from "react";

export default function UseOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking inside the referenced element or its descendants
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event); // Call the handler function if clicked outside
    };

    // Add event listeners for mouse and touch events
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup listeners when the component unmounts or ref/handler changes
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Dependency array: effect will run when ref or handler changes
}
