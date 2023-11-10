import { PORTAL_ID } from '@constants';
import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const rootPortal = document.getElementById(PORTAL_ID) as HTMLElement;

  return ReactDOM.createPortal(children, rootPortal);
};
