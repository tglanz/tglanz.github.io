import Headline from '../Headline';

import useConfig from "../utils/useConfig";
import Nav from '../Nav';

const SideBar = () => {
  const config = useConfig();

  return (
    <nav className='p-6 border border-r-2'>
      <div className="flex flex-col items-center">
        <img src="/logo.png" width={100} height={100}></img>
        <span className="text-3xl font-semibold">{config.headline.title}</span>
        <span className="text-lg">{config.headline.subtitle}</span>
      </div>

      <div className='mt-6'>
        <Nav />
      </div>
    </nav>
  );
}

export default SideBar;