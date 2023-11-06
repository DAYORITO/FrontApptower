/* eslint-disable no-undef */
import { Form } from "../../Components/Details/Content/Form/Form"
import { Detail } from "../../Components/Details/Detail"
import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Header } from "../../Components/Details/Content/Header/Header"
import { IconHeader } from "../../Components/Details/Content/Header/IconHeader/IconHeader"
import { ColHeader } from "../../Components/Details/Content/Header/ColHeader/ColHeader"
import { Tbody } from "../../Components/Tbody/Tbody"
import { TablePerson } from "../../Components/Tables/Tables"
import { NavItem } from "../../Components/Details/Content/NavTab/NavItem"
import { NavTab } from "../../Components/Details/Content/NavTab/NavTab"


export const ResidentDetail = () => {
  return (
    <Detail>
      <Form>
        <Header>
          <ColHeader>
            <IconHeader name='fe fe-32 fe-users' />
            <div className="col">
              <p className="h3 mb-0 text-gray-800">Residente</p>
              <p className="mb-4">Información del residentes</p>
            </div>
          </ColHeader>
        </Header>
        <NavTab>
          <NavItem name='Información' />
          <NavItem name='Vehículos' />
          <NavItem name='Visitantes' />
        </NavTab>
        <TablePerson>
          <Thead>
            <Th name={'Visitante'}></Th>
            <Th name={'Autoriza'}></Th>
            <Th name={'Vehículo'}></Th>
            <Th name={'Fecha de Ingreso'}></Th>
            <Th name={'Estado'}></Th>
          </Thead>
          <Tbody>
            <tr className="file-list">
              <td className="text-center">Nombre</td>
              <td className="text-center">Nombre</td>
              <td>Nombre</td>
              <td>Nombre</td>
              <td>
                <button className="btn btn-primary">Editar</button>
              </td>
            </tr>
            <tr className="file-list">
              <td className="text-center">Nombre</td>
              <td className="text-center">Nombre</td>
              <td>Nombre</td>
              <td>Nombre</td>
              <td>
                <button className="btn btn-primary">Editar</button>
              </td>
            </tr>
            <tr className="file-list">
              <td className="text-center">Nombre</td>
              <td className="text-center">Nombre</td>
              <td>Nombre</td>
              <td>Nombre</td>
              <td>
                <button className="btn btn-primary">Editar</button>
              </td>
            </tr>
            <tr className="file-list">
              <td className="text-center">Nombre</td>
              <td className="text-center">Nombre</td>
              <td>Nombre</td>
              <td>Nombre</td>
              <td>
                <button className="btn btn-primary">Editar</button>
              </td>
            </tr>
            <tr className="file-list">
              <td className="text-center">Nombre</td>
              <td className="text-center">Nombre</td>
              <td>Nombre</td>
              <td>Nombre</td>
              <td>
                <button className="btn btn-primary">Editar</button>
              </td>
            </tr>
          </Tbody>
        </TablePerson>
      </ Form>
    </Detail>
  )
}
