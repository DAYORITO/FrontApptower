import React from 'react';
import { Details } from "../../../Components/Details/details"
import { InfoDetails } from '../../../Components/InfoDetails/InfoDetails';
import { Acordions } from '../../../Components/Acordions/Acordions';
import { DropdownInfo } from '../../../Components/DropdownInfo/DropdownInfo';
import { useFetch } from '../../../Hooks/useFetch';
import { useSearchParams } from 'react-router-dom';

const GuestIncomeDetails = () => {
    const url = 'http://localhost:3000/'

    const [searchParams] = useSearchParams()

    console.log(searchParams);

    const {data, loading, error, get} = useFetch()
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

export default GuestIncomeDetails;