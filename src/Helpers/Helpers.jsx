

export const filterGuestIncomes = (search, guestIncomes) => {

    let guestIncomesbyApartment = [];
  
    if (!search) {
      guestIncomesbyApartment = guestIncomes.data.guestIncome;
    } else {
      guestIncomesbyApartment = guestIncomes.data.guestIncome.filter((dato) =>
        dato.asociatedVisitor.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    return guestIncomesbyApartment;
  };