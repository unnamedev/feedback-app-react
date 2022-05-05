import useDarkMode from "../../hooks/userDarkMode"
import {MdDarkMode, MdLightMode} from "react-icons/md"

/**
 * @description ToggleMode
 * @returns {JSX.Element}
 * @constructor
 */
const ToggleMode = () => {
    const [isDark, setIsDark] = useDarkMode()

    return <label className="block cursor-pointer text-yellow-500 dark:text-violet-600 transition-all">
        <input
            className="visually-hidden"
            type="checkbox"
            checked={isDark}
            onChange={e => setIsDark(e.target.checked)}
        />
        {isDark ? <MdDarkMode size={20}/> : <MdLightMode size={20}/>}
    </label>
}

export default ToggleMode
