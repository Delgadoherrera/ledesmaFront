import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ProductServices } from "../../Services/ProductService";
import { Materiales } from "../../interfaces";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { useSelector } from "react-redux";
import ComboList from "../simple/ComboList";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [materiales, setMateriales] = React.useState<Materiales[]>([]); // Inicializado como un array vacío
  const [elementCombo, setElementCombo] = React.useState<Materiales[]>([]);
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );

  const materialResponse = new ProductServices();

  const buscarMaterialPorDescripcion = (descripcion: string) => {
    return materiales.find(
      (material) => material.descripcion === descripcion
    ) as Materiales;
    // Usamos 'as Materiales' para indicar a TypeScript que estamos seguros de que el valor no será 'undefined'.
  };

  const agregarACombo = (e: Materiales) => {
    const materialIndex = elementCombo.findIndex(
      (material) => material.id === e.id
    );

    if (materialIndex === -1) {
      setElementCombo((prevElementCombo) => [...prevElementCombo, e]);
      // Cuando agregas un elemento a elementCombo, agrégalo también a personName
      setPersonName((prevPersonName) => [...prevPersonName, e.descripcion]);
    }
  };

  const quitarDelCombo = (e: Materiales) => {
    setElementCombo((prevElementCombo) =>
      prevElementCombo.filter((material) => material.id !== e.id)
    );
    // Cuando quitas un elemento de elementCombo, quítalo también de personName
    setPersonName((prevPersonName) =>
      prevPersonName.filter((descripcion) => descripcion !== e.descripcion)
    );
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    if (Array.isArray(value)) {
      setPersonName(value);

      const selectedMaterials = value.map((val) =>
        buscarMaterialPorDescripcion(val)
      );

      setElementCombo(selectedMaterials);
    }
  };

  React.useEffect(() => {
    materialResponse.ListarProductos().then((data) => {
      // Usamos reduce para filtrar elementos duplicados por descripción
      const uniqueMaterials = data.reduce((unique: any, material: any) => {
        // Comprobamos si ya hemos agregado un material con la misma descripción
        const existingMaterial = unique.find(
          (m) => m.descripcion === material.descripcion
        );

        if (!existingMaterial) {
          // Si no existe un material con la misma descripción, lo agregamos
          unique.push(material);
        }

        return unique;
      }, []);

      console.log("MATERIALES", uniqueMaterials);
      setMateriales(uniqueMaterials);
    });
  }, [refresh]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Materiales</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Materiales" />}
          MenuProps={MenuProps}
        >
          {Array.isArray(materiales) &&
            materiales.map((material: Materiales) => (
              <MenuItem
                key={material.id}
                value={material.descripcion}
                style={getStyles(material.descripcion, personName, theme)}
              >
                {material.descripcion} {/* ({material.medida}
                {material.unidadMedida.unidadMedida}) */}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <ComboList elementCombo={elementCombo} setElementCombo={quitarDelCombo} />
    </div>
  );
}
