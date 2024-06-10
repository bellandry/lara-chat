import Authenticated from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';

function Home() {
    return (
        <div className='text-muted text-slate-700 dark:text-white'>
            Messages
        </div>
    );
}

Home.layout = (page) => {
    return (
        <Authenticated user={page.props.auth.user} >
            <ChatLayout children={page} />
        </Authenticated>
    )
}

export default Home