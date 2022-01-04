import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

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
    setNoteList(JSON.parse(localStorage.getItem("note")))
    //localStorage.setItem("note", JSON.stringify([]))
  }, []);
  
  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(noteList))
  }, [noteList]);

  const sanitizeString = (str) => {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
  }

  const addEntry = (e) => {
    e.preventDefault()
    if(!singleNote.hasOwnProperty('titleField')) return
    setNoteList([...noteList, { ...singleNote, slugField: sanitizeString(singleNote.titleField), dateModified: Date.now() }])    
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
    <div className="font-mono flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Note App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 my-10 text-center max-w-2xl">
        <h1 className="text-4xl font-bold">
          Note App
        </h1>
        <div className="flex flex-wrap items-center justify-around mt-6">
          <div
            className="p-6 mt-6 text-left border w-full rounded-xl"
          >
            <form className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-semibold mb-2">
                    Note title
                  </label>
                  <input value={singleNote?.titleField ?? ''} className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title-field" type="text" placeholder="Title" onChange={(e) => setSingleNote({...singleNote, titleField: e.target.value })} />
                </div>
                <div className="w-full px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Note
                  </label>
                  <textarea rows={5} className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="note-field" placeholder="Main text" onChange={(e) => setSingleNote({...singleNote, noteField: e.target.value })} value={singleNote?.noteField}></textarea>
                </div>
              </div>
            </form>     
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addEntry}>Add new note</button>
          </div>
          { noteList.length > 0 && noteList.sort((a, b) => b.dateModified - a.dateModified).map((v) => 
          <div
            key={v.slugField}
            className="p-6 mt-6 text-left border w-full rounded-xl flex justify-between"
          >
            <div>
              <Link href={v.slugField}>
                <h3 className="text-2xl font-bold mb-2 cursor-pointer hover:text-blue-600 focus:text-blue-600">
                  { v.titleField }
                </h3>
              </Link>
              <p className="text-md mb-2">
              { v.noteField }
              </p>
              <p className="text-xs text-gray-400">
              Modified on { new Date(v?.dateModified).toLocaleDateString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) }
              </p>
            </div>
            <div>
              <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm" onClick={(e) => deleteEntry(e, v.slugField)}>delete</button>
            </div>
          </div>
          ) }
          <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm absolute right-8 top-10" onClick={deleteEntries}>Delete All</button>
        </div>
      </main>
    </div>
  )
}
