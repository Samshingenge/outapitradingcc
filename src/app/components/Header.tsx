"use client"

import React,{ useState} from 'react';
import './header.css'
import Link from 'next/link';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);

    const handleFormOpen=(e: Event | any)=>{
        e.preventDefault();
        setOpen(!open);
    }

    const handleToggleMenu=()=>{
        setOn(!on);
        let body: HTMLElement | any = document.querySelector('body')
        body.classList.toggle('mobile-nav-active')
    }
  return (
    <div>
      <header id='header' className='header d-flex align-items-center fixed-top'>

        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <Link href="/" className="logo d-flex align-items-center">
            <img src="/assets/img/logo.jpg" alt='logo' className="img-fluid"/>
                <h1>Outapi Tradingcc</h1>
            </Link>
         <Nav/>   

         <div className="position-relative">
        <Sci />
        <a className="mx-2 js-search-open" onClick={handleFormOpen}>
            <i className="bi-search"></i>
        </a>

        {
            on ? (
                <i className='bi bi-x mobile-nav-toggle' onClick={handleToggleMenu}></i>
            ) : (
                <i className='bi bi-list mobile-nav-toggle' onClick={handleToggleMenu}></i>
            )
        }
        <SearchForm active={open} formOpen={handleFormOpen} />
         </div>
        </div>
        

      </header>
    </div>
  )
}
