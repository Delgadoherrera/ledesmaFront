export interface Materiales {
  descripcion: string;
  unidadMedida: string;
  medida: string;
  id:number;
}

export interface Compras {
  idCompra: string;
  idMaterial: string;
  fechaCompra: Date;
  precioDolar:number;
  precioPesos:number;
  catalogo_material:any;

}

