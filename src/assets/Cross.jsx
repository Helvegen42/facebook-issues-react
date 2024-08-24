const Cross = () => {
  return (
    <svg
      width='100'
      height='100'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line
        x1='2'
        y1='2'
        x2='6'
        y2='6'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='6'
        y1='2'
        x2='2'
        y2='6'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default Cross;
