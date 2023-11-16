import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  BorderHorizontalOutlined,
  DollarCircleOutlined,
  HeatMapOutlined,
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
  
 *//*  getItem("Productos", "sub3", <HeatMapOutlined />, [
    getItem("Categorias y tipos", "Categorias y tipos"),
    getItem("Alta producto", "Alta producto"),
    getItem("Reporte de productos", "Reporte de productos"),
  ]), */
  getItem("Materiales", "sub1", <BorderHorizontalOutlined />, [
    getItem("Cargar materiales", "Cargar materiales"),
    getItem("Compra de materiales", "Compra de materiales"),
    getItem("Reporte de compra de materiales", "Reporte de compras"),
  ]),

  getItem("Costos", "sub2", <DollarCircleOutlined />, [
    getItem("Cargar costos", "Cargar costos"),
    getItem("Registrar costos", "Registrar costos"),
    getItem("Reporte de costos", "Reporte de costos"),
    /*     getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]), */
  ]),
/*   getItem("Calendario","Calendario", [
  ]), */
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = useState(['sub1', 'sub2', 'sub3']);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={collapsed ? { width: "90px" } : { width: "AUTO" }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={openKeys}
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
