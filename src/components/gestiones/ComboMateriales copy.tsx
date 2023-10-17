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

  const buscarMaterialesPorDescripcion = (descripcion: string) => {
    return materiales.filter((material) => material.descripcion === descripcion);
  };


  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    if (Array.isArray(value)) {
      setPersonName(value);

      // Para cada descripción seleccionada, busca todos los materiales con esa descripción.
      const selectedMaterials = value.flatMap((val) =>
        buscarMaterialesPorDescripcion(val)
      );

      setElementCombo(selectedMaterials);
    }
  };

  React.useEffect(() => {
    materialResponse.ListarProductos().then((data) => {
      setMateriales(data);
    });
  }, [refresh]);
  React.useEffect(() => {
    materialResponse.ListarProductos().then((data) => {
      setMateriales(data);
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
                {`${material.descripcion} (${material.medida} ${material.unidadMedida})`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <ComboList elementCombo={elementCombo} setElementCombo={setElementCombo}/>
    </div>
  );
}





