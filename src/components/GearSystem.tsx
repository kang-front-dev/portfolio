import React, { useEffect } from 'react';

import { gearsInfo } from './gearsInfo';

export default function GearSystem() {
  useEffect(() => {
    // console.log(gearSystem.current);
  }, []);

  return (
    <div
      className="gearSystem active"
      ref={(gearSystem) => {
        console.log(gearSystem);
        if (gearSystem) {
          gearSystem.style.height = gearSystem.offsetWidth + 'px';
        }
        return gearSystem;
      }}
    >
      <div className="gearSystem_wrapper">
        {gearsInfo.map((item, index) => {
          return (
            <img src={item.src} className={item.className} alt="" key={index} />
          );
        })}
      </div>
    </div>
  );
}
