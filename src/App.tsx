import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import AppRouter from './navigation/AppRouter';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}
