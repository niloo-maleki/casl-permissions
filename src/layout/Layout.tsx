import { ReactNode } from "react";
import TopNav from "./components/TopNav";
import Menu from "./components/Menu";
import { Loading } from "@shatel/ui-kit";

type Props = {
    children: ReactNode;
    role: string | null
};
const Layout = ({ children, role }: Props) => {

    if (!role || role === null) {
        return <Loading/>
    }

    return (
        <div className='h-screen overflow-hidden flex flex-col'>
            <TopNav title={role} />

            <section className='flex grow h-screen overflow-y-auto'>

                <Menu />

                <main className='flex p-large grow bg-secondary'>
                    {children}
                </main>
            </section>
        </div>
    )
}

export default Layout