import { useEffect, useState } from 'react';

import { checkDeviceWidth } from '@helpers';
import { MediaBreakpoints } from '@constants';

const EVENT_TYPE = 'resize';

export const useMedia = () => {
  const [devices, setDevices] = useState({
    isMobile: checkDeviceWidth(MediaBreakpoints.MOBILE),
    isTablet: checkDeviceWidth(MediaBreakpoints.TABLET),
    isLaptop: checkDeviceWidth(MediaBreakpoints.LAPTOP),
    isDesktop: checkDeviceWidth(MediaBreakpoints.DESKTOP),
  });

  const checkDevice = () => {
    setDevices({
      isMobile: checkDeviceWidth(MediaBreakpoints.MOBILE),
      isTablet: checkDeviceWidth(MediaBreakpoints.TABLET),
      isLaptop: checkDeviceWidth(MediaBreakpoints.LAPTOP),
      isDesktop: checkDeviceWidth(MediaBreakpoints.DESKTOP),
    });
  };

  useEffect(() => {
    window.addEventListener(EVENT_TYPE, checkDevice);

    return () => {
      window.removeEventListener(EVENT_TYPE, checkDevice);
    };
  }, []);

  return devices;
};
