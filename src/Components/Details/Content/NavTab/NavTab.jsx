const NavBar = () => {
  return (
    <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
      <li className="nav-item">
        <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
      </li>
    </ul>
  );
};

export default NavBar;
