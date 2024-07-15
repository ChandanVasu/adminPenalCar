import { FaHome} from 'react-icons/fa';
import { IoCarSportSharp  } from "react-icons/io5";

import Link from 'next/link';

export default function AdminMenu() {
  return (
    <div className=''>
      <ul className='adminMenuList '>
        <li>
          <FaHome /> <Link href="/">Dashboard</Link>
        </li>
        <li>
          <IoCarSportSharp  /> <Link href="/listing">Listing</Link>
        </li>
      </ul>
    </div>
  );
}
