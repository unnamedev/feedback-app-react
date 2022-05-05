import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import {feedbackSliceActions} from '../../features/feedbackSlice'

/**
 * @description Form
 * @returns {JSX.Element}
 * @constructor
 */
const Form = () => {
    // 🍀 HOOKS:
    const dispatch = useDispatch()
    const {isEditing} = useSelector(({feedback}) => feedback)
    const [selected, setSelected] = useState(10)
    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm()

    // 🍀 EFFECTS:
    useEffect(() => {
        // Set form values if editing is true
        if (isEditing.edit === true) {
            setSelected(isEditing.item.rating)
            setValue("text", isEditing.item.text)
        }
    }, [isEditing])

    // 🍀 FUNCTIONS:
    const onSubmit = (data) => {
        dispatch(isEditing.edit === true ? feedbackSliceActions.updateItem({
            id: isEditing.item.id,
            updateItem: data
        }) : feedbackSliceActions.addItem(data))
        setSelected(10)
        reset()
    }

    // 🍀 RENDER:
    return <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 md:gap-5 p-4 md:p-6 shadow rounded-lg bg-white dark:bg-slate-900 dark:text-white"
    >
        <h2 className="text-lg font-semibold">How would you rate your service with us?</h2>

        {/* Select */}
        <div className="flex flex-wrap justify-center items-center gap-2">
            {[...Array(10)].map((i, idx) =>
                <div key={idx}>
                    <input
                        className="peer visually-hidden"
                        type="radio"
                        name="rating"
                        id={`${idx + 1}`}
                        value={idx + 1}
                        checked={Number(selected) === idx + 1}
                        {...register("rating", {
                            required: true,
                            onChange: (e) => setSelected(e.target.value)
                        })}
                    />
                    <label
                        className={`option ${errors.rating && "bg-red-500 text-white"} `}
                        htmlFor={`${idx + 1}`}
                    >
                        {idx + 1}
                    </label>
                </div>
            )}
        </div>

        {/* Text */}
        <div className="relative w-full">
            <div>
                <input
                    className={`border-2 p-3 pr-[100px] w-full rounded-lg transition-all ${errors.text && "border-red-500"} dark:border-violet-600`}
                    type="text"
                    name="text"
                    placeholder="Write your review"
                    {...register("text", {
                        required: true,
                        minLength: 10,
                    })}
                />
            </div>
            {/* Error message */}
            {errors.text &&
                <motion.p
                    className="text-red-500 pt-1 text-sm"
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                >
                    Review must be at least 10 characters
                </motion.p>
            }
            <button className={`btn ${errors.text && "bg-slate-300 pointer-events-none dark:bg-slate-400"}`}
                    type="submit">Send
            </button>
        </div>
    </form>
}

export default Form
