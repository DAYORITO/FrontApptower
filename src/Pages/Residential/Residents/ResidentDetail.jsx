/* eslint-disable no-undef */

import { Thead } from '../../../Components/Thead/Thead'
import { Th } from '../../../Components/Th/Th'
import { Text } from '../../../Components/Details/Text/text'
import { Header } from "../../../Components/Details/Header/Header"
import { IconHeader } from "../../../Components/Details/IconHeader/IconHeader"
import { ColHeader } from "../../../Components/Details/ColHeader/ColHeader"
import { Tbody } from "../../../Components/Tbody/Tbody"
import { TablePerson } from "../../../Components/Tables/Tables"
import { NavItem } from "../../../Components/Details/NavTab/NavItem"
import { NavTab } from "../../../Components/Details/NavTab/NavTab"
import { Row } from "../../../Components/Rows/Row"
import { Actions } from "../../../Components/Actions/Actions"
import { Details } from "../../../Components/Details/details"
import { ActionHeader } from "../../../Components/Details/ActionHeader/ActionHeader"
import { ColHelper } from '../../../Components/Details/ColHelper/ColHelper'

export const ResidentDetail = () => {
  return (
    <>
      <Details>
        <Header>
          <IconHeader name="fe fe-24 fe-user" />
          <ColHeader title={'Maria Lopez'}>
            <ColHelper>
              <Text>pdf: ##########</Text>
              <Text>docType:###########</Text>
              <Text>docNumber:$$$$$$$$$</Text>
            </ColHelper>
            <ColHelper>              
              <Text>Name:##############</Text>
              <Text>LastName:##########</Text>
              <Text>Sex:#########</Text>
            </ColHelper>
            <ColHelper>              
              <Text>Birthday:##/##/####</Text>
              <Text>Email:##############</Text>
              <Text>Phone number:############</Text>
            </ColHelper>
            <ColHelper>              
              <Text>ResidentType:###########</Text>
              <Text>Status:###########</Text>
            </ColHelper>
          </ColHeader>
          <ActionHeader>

          </ActionHeader>
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
