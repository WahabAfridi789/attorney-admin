import { SideNavItemGroup } from "@/types/type";
import { BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle } from "react-icons/bs";



export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [{
            title: 'Dashboard',
            path: '/dashboard',
            icon: <BsHouseDoor size={20} />,
        }]
    },
    {
        title: "Cities",
        menuList: [{
            title: 'Cities',
            path: '/dashboard/cities',
            icon: <BsHouseDoor size={20} />,
        }]
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Attorneys',
                path: '/dashboard/attorneys',
                icon: <BsKanban size={20} />,

            },
            {
                title: 'Articles',
                path: '/dashboard/articles',
                icon: <BsListUl size={20} />,
            },

        ]
    },
    {
        title: "Others",
        menuList: [
            {
                title: 'Account',
                path: '/account',
                icon: <BsGear size={20} />,
            },
            {
                title: 'Help',
                path: '/help',
                icon: <BsQuestionCircle size={20} />,
            }
        ]
    }

];