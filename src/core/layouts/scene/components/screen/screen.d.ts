import {ReactNode} from 'react';

export interface IScreen {
    visible: boolean;
    contentKey: string;
    children: ReactNode;
    onEject: () => void;
}
