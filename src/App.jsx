import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
// import '@mantine/core/styles.layer.css';
// import 'mantine-datatable/styles.layer.css';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
