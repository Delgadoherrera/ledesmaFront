import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { menuSelect } from "../features/dataReducer/dataReducer";
import { useDispatch } from "react-redux";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  /*   getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  
 */
  getItem("Materiales", "sub1", <MailOutlined />, [
    getItem("Cargar matariales", "Cargar matariales"),
    getItem("Compra de materiales", "Compra de materiales"),
    getItem("Reporte de compras", "Reporte de compras"),
  ]),

  getItem("Costos", "sub2", <AppstoreOutlined />, [
    getItem("Cargar costos", "Cargar costos"),
    getItem("Registrar costos", "Registrar costos"),
    getItem("Reporte de costos", "Reporte de costos"),
    /*     getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]), */
  ]),
  getItem("Productos", "sub3", <MailOutlined />, [
    getItem("Categorias y tipos", "Categorias y tipos"),
    getItem("Alta producto", "Alta producto"),
    getItem("Reporte de productos", "Reporte de productos"),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch=useDispatch()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={collapsed? {width:'90px'}: {width:'200px'}}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={(e) => dispatch(menuSelect(e.key))}
      />
    </div>
  );
};

export default App;
