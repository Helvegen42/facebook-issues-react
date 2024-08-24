const EmojisMenu = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 h-6 text-white hover:text-white'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <circle cx='12' cy='12' r='10' stroke='currentColor' />
      <circle cx='9' cy='10' r='1' fill='currentColor' />
      <circle cx='15' cy='10' r='1' fill='currentColor' />
      <path d='M8 15a4 4 0 0 1 8 0' stroke='currentColor' />
    </svg>
  );
};

export default EmojisMenu;
