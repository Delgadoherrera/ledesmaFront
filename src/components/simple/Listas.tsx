import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Input, List, Skeleton } from "antd";
import { ProductServices } from "../../Services/ProductService";
import { useSelector } from "react-redux";
import { IonBadge } from "@ionic/react";
import { Materiales } from "../../interfaces";
import ModalList from "./Modals";

const count = 3; // Cambia el número de productos que deseas mostrar
const fakeDataUrl = `https://ledesma.devingfor.art/productos/listarTodos`; // Reemplaza esto con tu endpoint real de productos

const App: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState("");
  const service = new ProductServices();
  const [element, setElement] = useState<any>(null);
  const [todo, setTodo] = React.useState("");
  const [configModal, setConfigModal] = React.useState({
    action: "",
    tittle: "",
    bodyReq: "",
    element: element,
  });
  const [showMopdal, setShowModal] = React.useState(false);

  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );

  React.useEffect(() => {
    service.ListarProductos().then((data: any) => {
      const filteredData = data.filter(
        (product: any) => product.descripcion !== "hide"
      );
      const adaptedData = filteredData.map((product: any) => ({
        name: {
          first: `${product.descripcion}`,
          last: product.producto.descripcion,
          third: product.producto.categoria.detalle,
        },
        email:
          product.producto.categoria.detalle +
          ` > ` +
          product.producto.descripcion,
        pictures: product.imagenes.map((image: any) => image.blobImage), // Guardar todas las imágenes en un array
        medida: product.medida + product.unidadMedida.unidadMedida,
        loading: false,
        item: product,
      }));

      setList(adaptedData);
      setData(adaptedData);
      setFilteredProducts(adaptedData);

      setInitLoading(false);
    });
  }, [refresh]);
  const handleAction = (e: any, action: any, element: Materiales) => {
    switch (action) {
      case "deleteMaterial":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Deseas eliminar este material?",
          tittle: "Eliminar material",
          action: "deleteMaterial",
        });

        break;
      case "editProduct":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Editar producto?",
          tittle: "Editar Producto",
          action: "editProduct",
        });

        break;
      case "buyMaterial":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Comprar material?",
          tittle: "Comprar material",
          action: "buyMaterial",
        });

      case "deleteProduct":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Eliminar producto?",
          tittle: "Eliminar producto",
          action: "deleteProduct",
        });
      default:
        break;
    }
  };
  useEffect(() => {
    // Simula una llamada a la API para obtener los datos de productos
    // Aquí puedes realizar la llamada a tu propio endpoint
  }, []);

  /*  const onLoadMore = () => {
    setLoading(true);
    setList(
      list.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        // Simula una conversión de datos para que coincida con la estructura de usuario
        const adaptedData = res.map((product: any) => ({
          name: {
            first: product.descripcion,
            last: product.producto.descripcion,
          },
          email: product.medida,
          picture: {
            large: product.imagenes[0].blobImage,
          },
          loading: false,
        }));

        const newData = list.concat(adaptedData);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetear el offsetTop de la ventana para mostrar la lista completa
        window.dispatchEvent(new Event("resize"));
      });
  };
 */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    console.log("searchTerm", searchTerm);

    // Filtrar los productos en base al término de búsqueda
    const filtered = searchTerm
      ? list.filter(
          (product) =>
            product.name.first &&
            product.name.first.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : list;

    console.log("filtered", filtered);

    setFilteredProducts(filtered);
  };
  /*   const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Cargar más</Button>
      </div>
    ) : null;
 */
  return (
    <>
      {showMopdal && (
        <ModalList
          closeModal={() => {
            setShowModal(false);
            setConfigModal({
              action: "",
              tittle: "",
              bodyReq: "",
              element: null,
            });
          }}
          action={todo}
          tittle="Eliminar material?"
          bodyReq={`eliminar?`}
          element={element}
          configModal={configModal}
        />
      )}
      <div className="reportProductosContent">
        <IonBadge> Reporte de productos</IonBadge>
        <div className="search-container">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        /*         loadMore={loadMore}
         */ dataSource={filteredProducts} // Usar filteredProducts como fuente de datos
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="list-loadmore-edit"
                onClick={(e) => {
                  setElement(item.item);
                  handleAction(e, "editProduct", item.item);
                }}
              >
                Editar
              </Button>,
              <Button
                key="list-loadmore-edit"
                onClick={(e) => {
                  setElement(item.item);
                  handleAction(e, "deleteProduct", item.item);
                  setTodo("deleteProduct");
                }}
              >
                Eliminar
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <div
                className="picturesListProducts"
                style={{ display: "flex", minWidth: "200px" }}
              >
                {item.pictures.map((image: string, index: number) => (
                  <Avatar key={index} src={image} />
                ))}
              </div>

              <List.Item.Meta
                title={<a href="https://devinfor.art">{item.name?.first}</a>}
                description={` ${item.email}`}
              />
              <IonBadge>{item.medida}</IonBadge>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default App;
