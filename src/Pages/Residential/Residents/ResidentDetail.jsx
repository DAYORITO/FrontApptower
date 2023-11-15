/* eslint-disable no-undef */

import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Header } from "../../../Components/Details/Header/Header"
import { IconHeader } from "../../../Components/Details/IconHeader/IconHeader"
import { ColHeader } from "../../../Components/Details/ColHeader/ColHeader"
import { ColHelper } from "../../../Components/Details/ColHelper/ColHelper"
import { Text } from "../../../Components/Details/Text/Text"
import { Tbody } from "../../../Components/Tbody/Tbody"
import { TablePerson } from "../../../Components/Tables/Tables"
import { NavItem } from "../../../Components/Details/NavTab/NavItem"
import { NavTab } from "../../../Components/Details/NavTab/NavTab"
import { Row } from "../../../Components/Rows/Row"
import { Actions } from "../../../Components/Actions/Actions"
import { Details } from "../../../Components/Details/details"
import { ActionHeader } from "../../../Components/Details/ActionHeader/ActionHeader"

export const ResidentDetail = () => {
  return (
    <>
      <Details>
        <Header>
          <IconHeader name="fe fe-32 fe-user">
            <ActionHeader>

            </ActionHeader>
          </IconHeader>
          <ColHeader title={'Maria Lopez'}>
            <ColHelper>
              <Text title={'pdf:'}>##########</Text>
              <Text title={'docType:'}>###########</Text>
              <Text title={'docNumber:'}>$$$$$$$$$</Text>
            </ColHelper>
            <ColHelper>
              <Text title={'Name:'}>##############</Text>
              <Text title={'LastName:'}>##########</Text>
              <Text title={'Sex:'}>#########</Text>
            </ColHelper>
            <ColHelper>
              <Text title={'Birthday:'}>##/##/####</Text>
              <Text title={'Email:'}>##############</Text>
              <Text title={'Phone number:'}>############</Text>
            </ColHelper>
            <ColHelper>
              <Text title={'ResidentType:'}>###########</Text>
              <Text title={'Status:'}>###########</Text>
            </ColHelper>
          </ColHeader>

        </Header>
        <NavTab>

          <NavItem name={'Reservas'} />
          <NavItem name={'Apartamentos'} />

        </NavTab>
        <TablePerson id={'detail'}>
          <Thead>
            <Th></Th>
            <Th name={'Resident information'}></Th>
            <Th name={'Email'}></Th>
            <Th name={'Phone'}></Th>
          </Thead>
          <Tbody>
            <Row
              docType='TI'
              docNumber='2001234567'
              name='Maria'
              lastName='Lopez'
              phone='3216666666'
              email='maria@example.com'>
              <Actions accion='Edit resident'></Actions>
              <Actions accion='Assigned space to resident'></Actions>
            </Row>
            <Row
              docType='CC'
              docNumber='3003456789'
              name='Carlos'
              lastName='Rodriguez'
              phone='3217777777'
              email='carlos@example.com'>
              <Actions accion='Edit resident'></Actions>
              <Actions accion='Assigned space to resident'></Actions>
            </Row>

            <Row
              docType='CC'
              docNumber='4004567890'
              name='Laura'
              lastName='Gonzalez'
              phone='3218888888'
              email='laura@example.com'>
              <Actions accion='Edit resident'></Actions>
              <Actions accion='Assigned space to resident'></Actions>
            </Row>

            <Row
              docType='CC'
              docNumber='5005678901'
              name='Pedro'
              lastName='Martinez'
              phone='3219999999'
              email='pedro@example.com'>
              <Actions accion='Edit resident'></Actions>
              <Actions accion='Assigned space to resident'></Actions>
            </Row>


          </Tbody>
        </TablePerson>
      </Details>
    </>
  )
}
