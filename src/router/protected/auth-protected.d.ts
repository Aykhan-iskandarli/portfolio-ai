import {ReactElement} from 'react';

// Hazırda yalnız public sayt var. Admin panel əlavə olunanda 'auth' | 'public' layout-ları buraya gəlir.
export interface IAuthProtectedRouteProps {
    children: ReactElement;
    layout: 'open';
}
