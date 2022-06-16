import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserDetails } from '../../redux/reducer';
import lexer from '../../assets/images/lexer.svg';
import lexerlogo from '../../assets/images/lexarbig_logo.png';
import './Login.scss';
import login from '../../services/api';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<any>();

  const loginAPI = async (request: any) => {
    setIsLoading(true);
    try {
      const resp: any = await login(request);
      dispatch(updateUserDetails(resp));
      if (resp.role.toLowerCase() === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/user/dashboard', { replace: true });
      }
    } catch (error: any) {
      console.log('error :>> ', error);
      setErr(error);
      toast.error(`Login Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: any) => {
      loginAPI(values);
    },
  });

  return (
    <div className="">
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        {isLoading && <ReactLoading type="spokes" color="white" />}
      </div>
      <div className="flex">
        <div className="backgroundImg flex justify-center w-6/12 bg-[url('../assets/images/login_background.svg')] bg-no-repeat h-screen">
          <img className="h-1/3 self-center" alt="logo" src={lexerlogo} />
        </div>

        <div className="w-7/12 self-center">
          <div>
            <img className="mx-auto" alt="name" src={lexer} />
          </div>
          <div className="text-center mt-10">
            <p className="font-black text-4xl text-atlantis-500">Welcome Back</p>
            <p className="mt-5 text-white">Use your email address and password to login</p>
          </div>
          <div className="mt-7 justify-center">
            <form className="text-white" onSubmit={formik.handleSubmit}>
              <div>
                <p className="mb-1 w-1/2 mx-auto">Email address</p>
                <div className="text-center">
                  <input
                    id="email"
                    name="email"
                    className="w-1/2 py-3 px-3 rounded-lg text-white bg-bunker-500"
                    type="text"
                    placeholder="enter your email address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
              </div>
              <div className="mt-7">
                <p className="mb-1 mb-1 w-1/2 mx-auto">Password</p>
                <div className="text-center">
                  <input
                    id="password"
                    name="password"
                    className="w-1/2 py-3 px-3 rounded-lg text-white bg-bunker-500"
                    type="password"
                    placeholder="enter your password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
              </div>
              <div className="m-5 text-center">
                <label htmlFor="checkbox">
                  <input type="checkbox" />
                  &nbsp; Keep me logged in
                </label>
              </div>
              <div className="text-center">
                <button
                  className=" m-5 w-1/2 py-3 px-3 text-black text-lg font-bold rounded-lg bg-atlantis-500"
                  type="submit"
                >
                  Sign In
                </button>
                <p className="text-red-600 uppercase">{err}</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
