import * as React from 'react';

function Pin({ size = 4 }) {
  return (
    <div className={`flex h-${size * 2} w-${size * 2} cursor-pointer items-center justify-center rounded-full bg-red-500 bg-opacity-25`}>
      <div className={`h-${size} w-${size} rounded-full bg-red-500`}></div>
    </div>
  );
}

export default React.memo(Pin);
