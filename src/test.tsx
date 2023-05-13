import * as React from 'react';

import style from './test.module.scss';
import bg from './assets/bg.png';

const Test: React.FC = () => (
  <div className={style.block}>
    <img src={bg} alt="Error image" />
  </div>
);

export default Test;
