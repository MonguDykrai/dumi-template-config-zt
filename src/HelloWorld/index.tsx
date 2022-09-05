import React from 'react';
import './index.less';

const HelloWord = ({ title }: { title: string }) => (
  <div className="HelloWorld">
    <h1>{title}</h1>
  </div>
);

export default HelloWord;
