import FormButton from "../FormButton";
import InputText from "../InputText/InputText";
import InputTitle from "../InputTitle/InputTitle";

export default function ({ addEntry, setSingleNote, singleNote }) {
    return (
        <div
            className="p-6 mt-6 text-left drop-shadow-md w-full rounded-xl bg-white"
        >
            <form className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <InputTitle singleNote={singleNote} setSingleNote={setSingleNote} />
                    <InputText singleNote={singleNote} setSingleNote={setSingleNote} />
                </div>
                <FormButton addEntry={addEntry} />
            </form>
        </div>
    )
}