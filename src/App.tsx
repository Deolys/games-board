import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./routes";
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
       <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pt: 10 }}>
        <PageRoutes />
       </Container>
     </BrowserRouter>
  );
};

export default App;
