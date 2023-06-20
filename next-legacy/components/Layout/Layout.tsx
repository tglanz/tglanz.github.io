import React from 'react';
import Footer from '../Footer';
import SideBar from '../SideBar/SideBar';

import style from './Layout.module.css';

export interface ParentProps {
  children?: React.ReactNode
}

export interface LayoutProps extends ParentProps {}

const Layout = ({ children }: LayoutProps) => (
  <div className={style.container}>
    <SideBar />
    {children}
    <footer>
      <Footer />
    </footer>
  </div>
);

export interface MainProps extends ParentProps {}
const Main = ({ children }: MainProps) => <main>{children}</main>;
Layout.Main = Main;

export interface HeaderProps extends ParentProps {}
const Header = ({ children }: HeaderProps) => (
  <header>
    {children}
  </header>
);
Layout.Header = Header;

export default Layout;