import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FaRegEdit} from 'react-icons/fa'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {motion, AnimatePresence} from 'framer-motion'
import {average} from '../../utils/helpers'
import {feedbackSliceActions, setEditing} from '../../features/feedbackSlice'
import {Loader} from '../shared'

/**
 * @description List
 * @returns {JSX.Element}
 * @constructor
 */
const List = () => {
    // 🍀 HOOKS:
    const dispatch = useDispatch()
    const {items, isLoading, isError} = useSelector(({feedback}) => feedback)

    // 🍀 EFFECTS:
    useEffect(() => {
        dispatch(feedbackSliceActions.getItems())
    }, [])

    // 🍀 RENDER:
    if (isLoading) return <Loader/>
    if (isError) return <Loader error/>
    if (items.length === 0) return <p className="mt-5 text-center text-lg font-semibold">No feedback yet</p>

    return <div className="flex flex-col items-start gap-3 my-3">

        <p className="w-full flex items-center justify-between gap-2 text-sm sm:text-base">
            <span>{items.length} Reviews</span>
            <span>Average Rating: {isNaN(average(items)) ? 0 : average(items)}</span>
        </p>

        <div className="grid justify-items-start gap-3 w-full">
            <AnimatePresence>
                {items.map(i =>
                    <motion.div
                        className="w-full"
                        key={i.id}
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        layout
                    >
                        <ListItem {...i}/>
                    </motion.div>)}
            </AnimatePresence>
        </div>
    </div>
}

export default List


/**
 * @description ListItem
 * @returns {JSX.Element}
 * @constructor
 */
const ListItem = ({rating, text, id}) => {
    // 🍀 HOOKS:
    const dispatch = useDispatch()

    // 🍀 EFFECTS:
    const updateItem = (id) => {
        dispatch(setEditing({
            item: {rating, text, id},
            edit: true,
        }))
    }

    // 🍀 RENDER:
    return <div
        className="bg-white shadow rounded-lg relative p-4 pt-8 lg:p-5 lg:pt-9 dark:bg-slate-900 dark:text-white">
        {/* Control */}
        <div className="absolute right-0 top-0 flex items-center gap-1">
            <button className="p-1" onClick={() => updateItem(id)}>
                <FaRegEdit className="text-lg text-blue-500"/>
            </button>
            <button className="p-1" onClick={() => dispatch(feedbackSliceActions.deleteItem(id))}>
                <AiOutlineCloseCircle className="text-lg lg:text-xl text-red-500"/>
            </button>
        </div>
        {/* Rating */}
        <p className="absolute -left-1 -top-1 flex justify-center items-center w-[30px] h-[30px] rounded-full bg-slate-600 text-white font-semibold text-md dark:bg-violet-600">{rating}</p>
        {/* Text */}
        <p className="text-sm sm:text-base">{text}</p>
    </div>
}

