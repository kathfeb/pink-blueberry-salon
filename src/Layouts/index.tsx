/**
 * @description Common Layout with Header and Footer
 */
import { Outlet } from 'react-router-dom';

const PageLayout = (): JSX.Element => {
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className="bg-primary-blue-100 h-32 w-full">HEADER LAYOUT</div>
      <Outlet />
      <div className="bg-primary-blue-200 h-32 w-full">FOOTER LAYOUT</div>
    </div>
  );
};

export default PageLayout;
