import { DropdownExcel, SearchButton } from "../../Components/Buttons/Buttons";
import { ContainerTable } from "../../Components/ContainerTable/ContainerTable";

function GuestIncome() {
  return (
    <>
      <ContainerTable title="Ingreso de visitantes">
        <DropdownExcel/>
        <SearchButton/>
        
      </ContainerTable>
    </>
  );
}

export default GuestIncome;