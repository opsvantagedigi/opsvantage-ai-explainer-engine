import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function AppLayout({ children }) {
    const session = await getServerSession();
    if (!session)
        redirect('/login');
    return _jsx(_Fragment, { children: children });
}
