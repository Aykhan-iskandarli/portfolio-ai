import {useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {ConfigProvider} from 'antd';
import {MotionConfig} from 'framer-motion';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useStore} from './store/store.config';
import router from './router/router';
import {themeConfig} from './core/configs/theme.config';
import LoaderComponent from './core/shared/loader/loader.component';
import useGlobalStyles from './assets/styles/style';

const queryClient = new QueryClient();

function App() {
    const loader = useStore('loader');
    const lang = useStore('lang');
    useGlobalStyles();

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={themeConfig}>
                    <MotionConfig reducedMotion='user'>
                        <RouterProvider router={router}/>
                        {loader ? <LoaderComponent/> : null}
                    </MotionConfig>
                    <ToastContainer
                        position='bottom-right'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        closeButton={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover
                        theme='dark'
                        style={{zIndex: 50}}
                    />
                </ConfigProvider>
                {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false}/> : null}
            </QueryClientProvider>
        </HelmetProvider>
    );
}

export default App;
