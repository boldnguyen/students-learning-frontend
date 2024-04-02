import Navbar from "@/components/navbar"
import Navtop from "@/components/navtop"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <div className='block lg:flex min-h-screen h-screen'>
                <Navbar />
                <div className='flex-1 bg-[#f1f1f1] overflow-x-hidden'>
                    <div className="flex flex-col">
                        <Navtop />
                        <div className="px-3 flex-1 py-4 lg:py-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}