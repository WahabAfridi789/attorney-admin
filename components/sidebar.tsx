'use client'
import { SIDENAV_ITEMS } from '@/app/menu_constants';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import SideBarMenuGroup from './sidebar-menu-group';
import { SideBarLogo } from './sidebar-logo';


export const SideBar = () => {
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse } = useSideBarToggle();

    const asideStyle = classNames("sidebar overflow-y-auto overflow-x-auto fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]",
        {
            ["w-[20rem]"]: !toggleCollapse,
            ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
        });

    useEffect(() => setMounted(true), []);

    return (
        <aside className={asideStyle}>
            <div className="sidebar-top relative flex items-center px-3.5 py-5">
                {mounted && <svg height="30" width="30" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 241" enable-background="new 0 0 256 241" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M254,188V2H2v186h111v29H75v22h106v-22h-38v-29H254z M19,19h217v151H19L19,19z M184.473,106.507L168.38,52.933h-36.732 v-6.647c0-1.799-1.799-3.648-3.648-3.648c-1.799,0-3.648,1.799-3.648,3.648v6.697H87.62l-16.092,53.524h-0.35h-1.799 c0,12.144,9.845,22.039,22.039,22.039s22.039-9.845,22.039-22.039h-2.099h-0.35L95.816,56.281h28.836v78.162H96.115v11.195h3.648 H128h28.236h3.648v-11.195h-28.536V56.281h28.836l-15.193,50.226h-0.35h-2.099c0,12.144,9.845,22.039,22.039,22.039 s22.039-9.845,22.039-22.039h-1.799L184.473,106.507L184.473,106.507z M106.011,106.507H76.825L91.268,57.78L106.011,106.507z M149.989,106.507l14.743-48.726l14.443,48.726H149.989z"></path> </g></svg>}
                <h3 className={classNames("pl-2 font-bold text-2xl min-w-max text-sidebar-foreground",
                    { hidden: toggleCollapse })}>
                    Attorney Admin</h3>
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
                <div className="flex flex-col gap-2 px-4">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <SideBarMenuGroup key={idx} menuGroup={item} />;
                    })}
                </div>
            </nav>
        </aside>
    )
}
