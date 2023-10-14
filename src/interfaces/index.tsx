export interface Materiales {
  descripcion: string;
  unidadMedida: string;
  medida: string;
  id: number | null;
}

export interface Compras {
  idCompra: string;
  idMaterial: string;
  fechaCompra: string;
  precioDolar: number;
  precioPesos: number;
  catalogo_material: any;
}
