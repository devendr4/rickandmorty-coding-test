import { HiHome } from "react-icons/hi";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { BsPlusCircle } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

const Sidebar = () => {
  const options = [
    { title: "home", Icon: HiHome },
    { title: "queries", Icon: PiMagnifyingGlassBold, children: [] },
    { title: "create", Icon: BsPlusCircle },
  ];

  return (
    <nav className="bg-green p-3  h-screen w-100 top-0 sticky z-30">
      <ul className="flex flex-col justify-center h-full gap-4">
        {options.map(({ title, Icon, children }) => (
          <li
            key={title}
            className="flex flex-col  justify-center items-center border-black border-2"
          >
            <Icon />
            <span className="flex items-center gap-2">
              <p>{title}</p>
              {children && <FiChevronDown />}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
