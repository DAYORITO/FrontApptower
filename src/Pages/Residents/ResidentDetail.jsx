/* eslint-disable no-undef */

import { Thead } from '../../Components/Thead/Thead'
import { Th } from '../../Components/Th/Th'
import { Header } from "../../Components/Details/Header/Header"
import { IconHeader } from "../../Components/Details/IconHeader/IconHeader"
import { ColHeader } from "../../Components/Details/ColHeader/ColHeader"
import { Tbody } from "../../Components/Tbody/Tbody"
import { TablePerson } from "../../Components/Tables/Tables"
import { NavItem } from "../../Components/Details/NavTab/NavItem"
import { NavTab } from "../../Components/Details/NavTab/NavTab"
import { Row } from "../../Components/Rows/Row"
import { Actions } from "../../Components/Actions/Actions"
import { Details } from "../../Components/Details/details"
import { ActionHeader } from "../../Components/Details/ActionHeader/ActionHeader"

export const ResidentDetail = () => {
  return (
    <>
      <Details>
        <Header>
          <IconHeader name="fe fe-24 fe-user" />
          <ColHeader name={'Residente'}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus. In hac habitasse platea dictumst. Cras urna quam, malesuada vitae risus at, pretium blandit sapien.</p>
          </ColHeader>
          <ActionHeader>

          </ActionHeader>
        </Header>
        <NavTab>
          <NavItem name={'uno'}/>
          <NavItem name={'dos'}/>
          <NavItem name={'tres'}/>
          <NavItem name={'cuatro'}/>
          <NavItem name={'cinco'}/>
          <NavItem name={'seis'}/>
        </NavTab>
        <TablePerson>
          <Thead>
            <Th></Th>
            <Th name={'Resident information'}></Th>
            <Th></Th>

            <Th name={'Phone'}></Th>
            <Th name={'Email'}></Th>
          </Thead>
          <Tbody>
            <Row>
              <Actions></Actions>
            </Row>
            <Row>
              <Actions></Actions>
            </Row>
            <Row>
              <Actions></Actions>
            </Row>
            <Row>
              <Actions></Actions>
            </Row><Row>
              <Actions></Actions>
            </Row>
            <Row>
              <Actions></Actions>
            </Row><Row>
              <Actions></Actions>
            </Row>
            <Row>
              <Actions></Actions>
            </Row><Row>
              <Actions></Actions>
            </Row>
            <Row>
              <Actions></Actions>
            </Row>
          </Tbody>
        </TablePerson>
      </Details>
    </>
  )
}
