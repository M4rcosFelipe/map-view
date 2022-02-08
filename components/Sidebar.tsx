import { useState, useEffect } from "react";
import {
  Container,
  CloseButton,
  Field,
  Label,
  Input,
  SearchButton,
  Count,
} from "./Sidebar.styles";
import ArrowIcon from "../public/arrow-icon.png";
import Image from "next/image";
import MAPS_CONFIG from "../maps.config.js";

interface SidebarProps {
  filter: (searchValue: object, list: any[]) => void;
  list: any[];
  count: Number;
}
function Sidebar({ filter, list, count }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchValue, setSearchValue] = useState<any>({});
  const [showCount, setShowCount] = useState<boolean>(false);
  const [checkbox, setChekbox] = useState(false);

  console.log(searchValue);

  function toogleSidebar() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (checkbox === true) {
      setSearchValue(() => ({ ['Mostrar líderes']: 'TRUE' }))
    } else {
      setSearchValue({})
    }
  }, [checkbox])

  const fields = MAPS_CONFIG.filters;

  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    {
      name === 'Mostrar líderes' ?
        setChekbox(e.target.checked)
        :
        setSearchValue((values: any) => ({ ...values, [name]: value }))
    }
  }

  function handleClick() {
    filter(searchValue, list);
    setShowCount(true);
  }

  return (
    <Container isOpen={isOpen}>
      <CloseButton onClick={toogleSidebar} isOpen={isOpen}>
        <img src="arrow-icon.png" alt="Abrir/Fechar" />
      </CloseButton>
      <img style={{marginBottom: '20px'}} src='formulaviral.png' alt="" />
      <Count showCount={showCount}>
        <span>{count}</span>Resultados
      </Count>
      {fields.map((field) => {
        return (
          <Field key={field}>
            <Label>{field === 'Mostrar líderes' ? 'Mostrar apenas as igrejas com líderes' : field}</Label>
            <Input
              type={field === 'Mostrar líderes' ? 'checkbox' : 'text'}
              value={searchValue[field] || ""}
              checked={checkbox}
              name={field}
              onChange={handleChange}
            />
          </Field>
        );
      })}

      <SearchButton
        onClick={() => {
          handleClick();
        }}
      >
        Filtrar
      </SearchButton>
    </Container>
  );
}

export default Sidebar;
