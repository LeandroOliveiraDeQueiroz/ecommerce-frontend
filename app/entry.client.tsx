import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

//For better test uncomment the StrictMode - do re-render 

startTransition(() => {
  hydrateRoot(
    document,
    // <StrictMode>
    <HydratedRouter />
    // </StrictMode>
  );
});
