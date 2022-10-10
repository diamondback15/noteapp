export default function ({ setSingleNote, singleNote }) {
    return (
        <div className="w-full px-3 mb-6">
            <label className="block tracking-wide text-gray-700 text-sm font-semibold mb-2">
                Note title
            </label>
            <input value={singleNote?.titleField ?? ''} className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title-field" type="text" placeholder="Title" onChange={(e) => setSingleNote({ ...singleNote, titleField: e.target.value })} />
        </div>
    );
}