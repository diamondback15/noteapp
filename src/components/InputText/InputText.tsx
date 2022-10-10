export default function ({ setSingleNote, singleNote }) {
    return (
        <div className="w-full px-3 mb-6">
            <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Note
            </label>
            <textarea rows={5} className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="note-field" placeholder="Main text" onChange={(e) => setSingleNote({ ...singleNote, noteField: e.target.value })} value={singleNote?.noteField ?? ''}></textarea>
        </div>
    );
}