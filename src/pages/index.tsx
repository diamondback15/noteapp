import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import FormNote from 'components/FormNote'

export type Note = {
  titleField: string
  slugField: string
  noteField: string
  dateModified: number
}

export default function Home() {
  const [noteList, setNoteList] = useState<Note[]>([])
  const [singleNote, setSingleNote] = useState<Note>()

  useEffect(() => {
    setNoteList(JSON.parse(window.sessionStorage.getItem("note")) ?? [])
    window.sessionStorage.setItem("note", JSON.stringify([]))
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("note", JSON.stringify(noteList))
  }, [noteList]);

  const sanitizeString = (str) => {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    return str.trim();
  }

  const addEntry = (e) => {
    e.preventDefault()
    if (!singleNote.hasOwnProperty('titleField')) return
    setNoteList([...noteList, { ...singleNote, slugField: sanitizeString(singleNote.titleField), dateModified: Date.now() }])
    setSingleNote(null);
  }

  const deleteEntry = (e, slug) => {
    e.preventDefault()
    setNoteList(noteList.filter(obj => obj.slugField !== slug))
  }

  const deleteEntries = (e) => {
    e.preventDefault()
    setNoteList([])
  }

  return (
    <div className="font-mono flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      <Head>
        <title>Note App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 my-10 text-center max-w-2xl">
        <h1 className="text-4xl font-bold">
          Note App
        </h1>
        <div className="flex flex-wrap items-center justify-around mt-6">
          <FormNote addEntry={addEntry} singleNote={singleNote} setSingleNote={setSingleNote} />
          {noteList?.length > 0 && noteList.sort((a, b) => b.dateModified - a.dateModified).map((v) =>
            <div
              key={v.slugField}
              className="p-6 mt-6 text-left border w-full drop-shadow-md rounded-xl flex justify-between bg-white"
            >
              <div>
                <Link href={v.slugField}>
                  <h3 className="text-2xl font-bold mb-2 cursor-pointer hover:text-blue-600 focus:text-blue-600">
                    {v.titleField}
                  </h3>
                </Link>
                <p className="text-md mb-2">
                  {v.noteField}
                </p>
                <p className="text-xs text-gray-400">
                  Modified on {new Date(v?.dateModified).toLocaleDateString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </p>
              </div>
              <div>
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm" onClick={(e) => deleteEntry(e, v.slugField)}>delete</button>
              </div>
            </div>
          )}
          <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm absolute right-8 top-10" onClick={deleteEntries}>Delete All</button>
        </div>
      </main>
    </div>
  )
}
