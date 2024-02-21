import React from 'react';
import { Details } from '../../Components/Details/details';
import { InfoDetails } from '../../Components/InfoDetails/InfoDetails';
import { Acordions } from '../../Components/Acordions/Acordions';
import { DropdownInfo } from '../../Components/DropdownInfo/DropdownInfo';

const FinesDetail = () => {
  return (
    <>
      <Details>
        <InfoDetails>
            <Acordions>
                <DropdownInfo name="Datos del ingreso">

                </DropdownInfo>

            </Acordions>
        </InfoDetails>
      </Details>
    </>
  );
};

export default FinesDetail;
