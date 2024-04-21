
import { ToastProvider } from "contexts/ToastContext";
import Router from "./Router";

function App() {

  return (
    <>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </>
  );
}

export default App;