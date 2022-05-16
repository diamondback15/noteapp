import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Note } from '.'

export default function SingleNote() {
  const router = useRouter()
  const { noteId } = router.query
  const [noteList, setNoteList] = useState<Note[]>([])
  const [singleNote, setSingleNote] = useState<Note>()

  useEffect(() => {
    setNoteList(JSON.parse(localStorage.getItem("note")))
    //localStorage.setItem("note", JSON.stringify([]))
  }, []);

  useEffect(() => {
    setSingleNote(noteList.find(v => v.slugField === noteId))
  }, [noteList]);

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(noteList))
  }, [noteList]);

  const updateEntry = (e) => {
    e.preventDefault()
    const noteListArr = noteList.filter(obj => obj.slugField !== noteId)
    setNoteList([...noteListArr, { ...singleNote, dateModified: Date.now() }])
    router.push('/');
  }

  return (
    <div className="font-mono flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{noteId}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 max-w-2xl">
        <h1 className="text-4xl font-bold">
          {noteId}
        </h1>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6">
          <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label className="block tracking-wide text-gray-700 text-sm font-semibold mb-2">
                  Note title
                </label>
                <input value={singleNote?.titleField} className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title-field" type="text" placeholder="Title" onChange={(e) => setSingleNote({ ...singleNote, titleField: e.target.value })} />
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                  Note
                </label>
                <textarea rows={5} className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white mb-5" id="note-field" placeholder="Main text" onChange={(e) => setSingleNote({ ...singleNote, noteField: e.target.value })} value={singleNote?.noteField}></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateEntry}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
