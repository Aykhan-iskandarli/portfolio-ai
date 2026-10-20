import {Spin} from 'antd';
import useLocalization from 'assets/lang';
import {useLoaderStyles} from './loader.style';

function LoaderComponent() {
    const translate = useLocalization();
    const {loader} = useLoaderStyles();

    return (
        <div className={loader} role='status'>
            <Spin size='large'/>
            <span className='sr-only'>{translate('loading')}</span>
        </div>
    );
}

export default LoaderComponent;
