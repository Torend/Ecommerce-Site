import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { IoBagAdd, IoBag } from 'react-icons/io5';
import { BsInfoCircleFill } from 'react-icons/bs';
import { IoLogoGameControllerB } from 'react-icons/io';
// import { FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Header() {
  const history = useHistory();
  const cartLength = useSelector((state) => state.cart.length);

  return (
    <div className="header">
      <nav>
        <div
          className="logo"
          onClick={() => {
            history.push('/');
          }}
        >
          <IoLogoGameControllerB size="48" />
        </div>

        <ul className="nav-btns-list">
          {/* <Link to="/signin">
            <li className="nav-btn">
              <FaUserAlt size="24" />
            </li>
          </Link> */}
          <Link to="/cart">
            <li className="nav-btn">
              {cartLength ? <IoBagAdd size="24" /> : <IoBag size="24" />}
            </li>
          </Link>
          <Link to="/about">
            <li className="nav-btn">
              <BsInfoCircleFill size="24" />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
