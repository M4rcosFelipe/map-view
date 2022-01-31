import { useState } from "react";
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
  function toogleSidebar() {
    setIsOpen(!isOpen);
  }

  const fields = MAPS_CONFIG.filters;

  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setSearchValue((values: any) => ({ ...values, [name]: value }));
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
      <Count showCount={showCount}>
        Resultados<span>{count}</span>
      </Count>
      {fields.map((field) => {
        return (
          <Field key={field}>
            <Label>{field}</Label>
            <Input
              value={searchValue[field] || ""}
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
