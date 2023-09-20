import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/20/solid";
import Cookies from "js-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDropdown() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logout = () => {
      Cookies.set("user", "");
      dispatch({
        type: "LOGOUT",
      });
      navigate("/login");
    };

  return (
    <div>
      <div className="mt-12 lg:mt-0 sm:block md:hidden">
        <Link
          to={`/profile`}
          className={`relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max`}
        >
          <span className="relative text-sm font-semibold">Profile</span>
        </Link>
        <Link
          to={`/createAuction`}
          className={`relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max`}
        >
          <span className="relative text-sm font-semibold">Create Auction</span>
        </Link>
        <Link
          to={`/wallet`}
          className={`relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max`}
        >
          <span className="relative text-sm font-semibold">Wallet</span>
        </Link>
        <div
          onClick={() => {
            logout();
          }}
          className={`relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max`}
        >
          <span className="relative text-sm font-semibold text-white">
            LogOut
          </span>
        </div>
      </div>
      <Menu
        as="div"
        className="relative hidden inline-block text-left md:block"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/createAuction"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Create Auction
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/wallet"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Wallet
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => {
                      logout();
                    }}
                  >
                    LogOut
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
