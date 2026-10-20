import {lazy, Suspense} from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {Routes} from './routes';
import AuthProtectedComponent from './protected/auth-protected.component';
import LoaderComponent from 'core/shared/loader/loader.component';
import SceneComponent from 'core/layouts/scene/scene.component';
import NotFoundComponent from 'core/layouts/error/not-found/not-found.component';

const ProjectsComponent = lazy(() => import('pages/projects/projects.component'));
const ProjectDetailsComponent = lazy(() => import('pages/project-details/project-details.component'));
const AboutComponent = lazy(() => import('pages/about/about.component'));
const SkillsComponent = lazy(() => import('pages/skills/skills.component'));
const ExperienceComponent = lazy(() => import('pages/experience/experience.component'));
const ContactComponent = lazy(() => import('pages/contact/contact.component'));

const router = createBrowserRouter([
    {
        path: Routes.home,
        element: <AuthProtectedComponent layout='open'><SceneComponent/></AuthProtectedComponent>,
        children: [
            {
                path: Routes.projects,
                element: <Suspense fallback={<LoaderComponent/>}><ProjectsComponent/></Suspense>,
            },
            {
                path: Routes.projectDetails,
                element: <Suspense fallback={<LoaderComponent/>}><ProjectDetailsComponent/></Suspense>,
            },
            {
                path: Routes.about,
                element: <Suspense fallback={<LoaderComponent/>}><AboutComponent/></Suspense>,
            },
            {
                path: Routes.skills,
                element: <Suspense fallback={<LoaderComponent/>}><SkillsComponent/></Suspense>,
            },
            {
                path: Routes.experience,
                element: <Suspense fallback={<LoaderComponent/>}><ExperienceComponent/></Suspense>,
            },
            {
                path: Routes.contact,
                element: <Suspense fallback={<LoaderComponent/>}><ContactComponent/></Suspense>,
            },
            {
                path: '*',
                element: <NotFoundComponent/>,
            },
        ],
    },
], {basename: '/'});

export default router;
