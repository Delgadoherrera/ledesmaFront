import axios, { AxiosResponse } from "axios";

export class ProductServices {
  async AgregarMaterial(data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/materiales/nuevoMaterial`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async eliminarMaterial(id: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/materiales/borrarMaterial/${id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error eliminando material:", error);
      return null;
    }
  }
  async ListarMateriales(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://ledesma.missingpets.art/materiales/listarTodos`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error listando materiales:", error);
      return null;
    }
  }
  async ListarProductos(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://ledesma.missingpets.art/productos/listarTodos`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error listando materiales:", error);
      return null;
    }
  }
  async ListarCostos(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://ledesma.missingpets.art/costos/listarTodos`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error listando materiales:", error);
      return null;
    }
  }
  async editarMaterial(data: any, id: any): Promise<any> {
    console.log("PRODUCIT EDIT", data, "IDMATERIAL", id);
    try {
      const response: AxiosResponse<any> = await axios.put(
        `https://ledesma.missingpets.art/materiales/editar/${id}`,
        { data: data },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error editando material:", error);
    }
  }
  async EditarCosto(data: any, id: any): Promise<any> {
    console.log("PRODUCIT EDIT", data, "IDMATERIAL", id);
    try {
      const response: AxiosResponse<any> = await axios.put(
        `https://ledesma.missingpets.art/costos/editar/${id}`,
        { data: data },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error editando material:", error);
    }
  }
  async comprarMaterial(data: any, id: any): Promise<any> {
    console.log("PRODUCIT EDIT", data, "IDMATERIAL", id);
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/materiales/comprar/${id}`,
        { data: data },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error editando material:", error);
    }
  }
  async ListarCompras(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://ledesma.missingpets.art/compras/listarTodas`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error listando materiales:", error);
      return null;
    }
  }
  async AgregarCombo(data: any, comboName: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/combos/nuevoCombo/${comboName}`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res addCombo", response);
      return response;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async AgregarProducto(data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/productos/nuevoProducto`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async AgregarGasto(data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/costos/nuevoCosto`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async AgregarCategoriaProducto(data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/categorias/nuevaCategoriaProducto`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async AgregarItemCategoriaProducto(data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/categorias/nuevoItemProducto`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async ConcretarCosto(data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/costos/itemCosto`,
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async ListarItemCosto(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://ledesma.missingpets.art/costos/listarItems`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      const rest = response.data;
      return rest;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
  async ListarCategoriaProductos(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://ledesma.missingpets.art/categoriasProductos/listarTodos`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error listando materiales:", error);
      return null;
    }
  }
  async EliminarCosto(id: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://ledesma.missingpets.art/costos/eliminarCosto/${id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      return response;
    } catch (error) {
      console.error("Error eliminando material:", error);
      return null;
    }
  }
  async ListarItemProducto(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://ledesma.missingpets.art/categorias/listarItemsProductos`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      const rest = response.data;
      return rest;
    } catch (error) {
      console.error("Error agregando material:", error);
      return null;
    }
  }
}
