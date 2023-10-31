import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const PORTAL_ID = 'portal';

export const Portal: FC<PortalProps> = ({ children }) => {
  const rootPortal = document.getElementById(PORTAL_ID) as HTMLElement;

  return ReactDOM.createPortal(children, rootPortal);
};
