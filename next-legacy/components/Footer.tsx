import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import useConfig from './utils/useConfig';

const IconLink: React.FC<{href: string}> = ({ href, children}) => (
  <Link href={href}>
    {children}
  </Link>
)

const Footer = () => {
  const config = useConfig();
  return (
    <div className="
        border-t-2
        p-4 flex
        flex-row justify-center items-center space-x-4" >
  
      <IconLink href={config.social.github}>
        <FaGithub />
      </IconLink>
  
      <IconLink href={config.social.linkedin}>
        <FaLinkedin />
      </IconLink>
    </div>
  );
}

export default Footer;
