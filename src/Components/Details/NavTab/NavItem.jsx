
// eslint-disable-next-line react/prop-types
export const NavItem = ({name}) => {
    return (
      <li className="nav-item">
        <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{name}</a>
      </li>
    )
  }