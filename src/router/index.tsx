import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../Layouts';
import SignUp from '../views/Example';

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
