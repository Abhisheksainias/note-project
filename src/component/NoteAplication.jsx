import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function NoteAplication() {
  const [note, setNote] = useState({
    title: "",
    desc: "",
  });

  const [notes, setNotes] = useState([]);

  const [updateIndex, setUpdateIndex] = useState();

  const [selectIndex, setSelectIndex] = useState([]);

  const handeltitel = (e) => {
    let localnote = { ...note };
    localnote.title = e.target.value;

    setNote(localnote);
  };

  const handeldesc = (e) => {
    let localnote = { ...note };
    localnote.desc = e.target.value;
    setNote(localnote);
  };

  function handelAdd() {
    if (note.title?.length > 0 && note.desc?.length > 0) {
      let previousNote = JSON.parse(localStorage.getItem("notedata"));
      let newdata = previousNote.concat(note);
      localStorage.setItem("notedata", JSON.stringify(newdata));
      setNotes(newdata);
      toast.success("Note Added Successfully");
      console.log(newdata);

      setNote({
        title: "",
        desc: "",
      });
    } else {
      toast.error("Please fill all the fields");
    }
  }

  function handelDel(id) {
    console.log("id is", id);

    let localNotes = [...notes];
    localNotes.splice(id, 1);
    setNotes(localNotes);

    toast.success("Deleted");

    localStorage.setItem("notedata", JSON.stringify(localNotes));

    // console.log("local notes", localNotes);
  }

  function handelupdate() {
    let localNotes = [...notes];
    localNotes[updateIndex] = note;
    setNotes(localNotes);
    localStorage.setItem("notedata", JSON.stringify(localNotes));
    setNote({ title: "", desc: "" });
    toast.success("Updated Successfully");
    setUpdateIndex();
  }

  function editnote(id) {
    // console.log("id is", id);

    // console.log("note is", notes[id]);
    setNote(notes[id]);
    setUpdateIndex(id);
  }

  const selectnote = (index) => {
    let localselect = [...setNotes];
    setSelectIndex(localselect);
    console.log("select is", selectIndex);
  };

  const selectdelete = () => {

  }

  // console.log("current note is", note);

  useEffect(() => {
    if (!localStorage.getItem("notedata"))
      localStorage.setItem("notedata", JSON.stringify([]));
    else {
      setNotes(JSON.parse(localStorage.getItem("notedata")));
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className=" container-fluid  w-75 mt-5 p-4 forminput">
        <h1 className=" note1 text-center">Notes Application</h1>

        <input
          type="text"
          placeholder="Title"
          className="form-control w-50 m-auto my-5 bg-transparent"
          onChange={handeltitel}
          value={note.title}
          required
        />

        <textarea
          placeholder="Write Note"
          className="form-control w-75 m-auto my-5 bg-transparent"
          onChange={handeldesc}
          value={note.desc}
          maxLength={100}
        />
        <div className="btn_group justify ">
          <button
            className="btn btn-primary px-5 text-dark  addbtn "
            onClick={handelAdd}
          >
            Add Note
          </button>

          {updateIndex >= 0 && (
            <button
              className="btn btn-dark text-dark px-5  updatebtn "
              onClick={handelupdate}
            >
              Update
            </button>
          )}
        </div>
      </div>

      <div className="noteset">
        <h1 className="notehadding w-75 text-center m-auto mt-5 mb-4">Notes</h1>
        <div className="notediv d-flex flex-wrap">
          {notes.map((e, i) => (
            <div
              className=" border p-4 text-center  mt-4 mx-1 noteindiv "
              key={i}
            >
              <h3 className="h3title">{e.title}</h3>
              <p className="para">{e.desc}</p>
              <button onClick={() => handelDel(i)}>
                <span>
                  <i class="fas fa-trash-alt"></i>
                </span>
              </button>

              <button onClick={() => editnote(i)}>
                <span>
                  <i class="fas fa-edit"></i>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NoteAplication;
