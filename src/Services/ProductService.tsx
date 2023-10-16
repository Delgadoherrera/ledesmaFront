import axios, { AxiosResponse } from "axios";

export class ProductServices {
  async AgregarProducto(data: any): Promise<any> {
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
  async ListarProductos(): Promise<any> {
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

  // COMPRAS
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
}
