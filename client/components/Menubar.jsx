import React, { useState, useContext } from "react";
import { Menu, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/auth";
const Menubar = () => {
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const {
    user,

    logout,
  } = useStateContext();
  const router = useRouter();
  const pathname = router.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  console.log(user);
  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} href="/" />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        href="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          href="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          href="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default Menubar;
