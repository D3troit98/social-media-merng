"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Menubar from "./Menubar";
import Footer from "./Footer";
import { Container } from "semantic-ui-react";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Hi World- Sign it and connect with friends</title>
        <meta name="description" content="social App." />
      </Head>
      <Container>
        <header>
          <Menubar />
        </header>
        <main className="main-container">{children}</main>
        <footer>
          <Footer />
        </footer>
      </Container>
    </div>
  );
};

export default Layout;
