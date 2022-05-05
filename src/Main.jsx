import {ToggleMode} from './components/shared';
import {Form, List} from './components/layout';

/**
 * @description Main
 * @returns {JSX.Element}
 * @constructor
 */
const Main = () =>
    <div className="min-h-screen flex flex-col bg-slate-200/70 dark:bg-slate-800 dark:text-white">
        {/* 🍀 Header */}
        <header className="bg-white py-2 lg:py-4 px-3 flex justify-center shadow dark:bg-slate-900 dark:text-white">
            <h1 className="flex items-center gap-1 font-semibold text-lg">Feed<ToggleMode/>back</h1>
        </header>

        {/* 🔅 Main */}
        <main className="flex-grow max-w-3xl m-auto w-full py-4 lg:py-6 px-2">
            <Form/>
            <List/>
        </main>

        {/* 🍀 Footer */}
        <footer
            className="grid justify-center text-center py-2 px-3 bg-white border-t md:py-4 dark:bg-slate-900 dark:text-white dark:border-t-slate-900">
            <p className="flex gap-1.5">
                Created by {" "}
                <a
                    className="block font-semibold text-blue-500 transition-all sm:text-base"
                    target="_blank"
                    href="https://github.com/unnamedev/">
                    unnamed
                </a>
            </p>
            <p className="text-sm">Copyright &copy; {new Date().getFullYear()} </p>
        </footer>
    </div>

export default Main
