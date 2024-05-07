/** @format */

import { Link, OverflowSet } from "@fluentui/react";
import React from "react";
import { PAGE_PATHS } from "../../constants";

const menuItems = [
  {
    key: "dashboard",
    name: "Dashboard",
    url: `/${PAGE_PATHS.DASHBOARD}`,
  },
  {
    key: "contents",
    name: "Contents",
    url: `/${PAGE_PATHS.CONTENT}`,
  },
  {
    key: "dataroom",
    name: "Dataroom",
    url: `/${PAGE_PATHS.DATAROOM}`,
  },
];

const linkMenuStyles = {
  root: {
    padding: 20,
  },
};

const renderMenu = item => (
  <Link role='menuitem' styles={linkMenuStyles} href={item.url}>
    {item.name}
  </Link>
);

export default function MenuLink() {
  return (
    <OverflowSet
      aria-label='Basic Menu'
      role='menu'
      items={menuItems}
      onRenderItem={renderMenu}
    />
  );
}
