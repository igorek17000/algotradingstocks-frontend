import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Logo from '../assets/images/lexer_logo.png';
import Title from '../assets/images/lexer_title.png';
import { updateUserDetails } from '../redux/reducer';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classNames = (...classes: any) => classes.filter(Boolean).join(' ');
  const userRole = useSelector((state: any) => state.userDetails.role);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {
        <>
          <div className="px-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img src={Logo} alt="lexer" className="h-12 m-auto" />
                  <img src={Title} alt="lexer" width={100} className="h-10 w-25 m-auto" />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:windowpr-0">
                {/* Profile dropdown */}
                <div className="text-white mr-2">
                  {window.location.pathname === '/admin/dashboard' ? (
                    <>
                      <button className="font-bold mr-2" type="button" onClick={() => navigate(`/admin/user-details`)}>
                        USERS
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                </div>
                <Menu as="div" className="ml-3 inline-block text-left">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      {/* <span className="sr-only">Open user menu</span> */}
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }: any) => (
                          <>
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                              onClick={() => {
                                if (userRole === 'admin') {
                                  navigate('/admin/dashboard');
                                } else {
                                  navigate('/user/dashboard');
                                }
                              }}
                            >
                              Dashboard
                            </button>
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                              onClick={() => {
                                dispatch(updateUserDetails(undefined));
                              }}
                            >
                              Sign out
                            </button>
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      }
    </Disclosure>
  );
}

export default Header;
