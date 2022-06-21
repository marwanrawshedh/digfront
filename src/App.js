import React, {  useRef, useState } from 'react';
import "./app.css"
import axios from 'axios';
import Table from './Component/Table';
import Format from './hook/Format';
import upload from ".//img//upload.png"
import Header from "./Component/Header.js";
function App(props) {
  let letter = ["A", "B", "C", "D", "E", "F", "G"]
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  
  const first = useRef();
  const sec = useRef();
  let [firstBtn, setFirstBtn] = useState(false);
  let [secBtn, setSecBtn] = useState(false);
  let [tables, setTables] = useState(undefined);
  let [file1Data, setDrop1] = useState(undefined);
  let [file2Data, setDrop2] = useState(undefined);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (first.current.value) {
      Format(first.current, setFirstBtn, "first", setDrop1)

    }
    else if (sec.current.value) {
      Format(sec.current, setSecBtn, "sec", setDrop2)

    }

  }
  const btHandler = async (e) => {
    let et = e.target
    e.preventDefault()
    let obj = {

      name1: file1Data.name,//name of the attached file
      sheet1: et.drop1.value,// name of the selected sheet 
      firstempl: parseInt(et.empl1.value),//emploees names 
      firstcompare: parseInt(et.letter1.value),// feild to compare
      row1: parseInt(et.row1.value )- 1,//row number

      name2: file2Data.name,//name of the attached file
      sheet2: et.drop2.value,// name of the selected sheet
      secempl: parseInt(et.empl2.value), //emploees names 
      seccompare: parseInt(et.letter2.value), // feild to compare
      row2: parseInt(et.row2.value )- 1, // starting row

      numHours: +et.numHours.value// Number Of Total Hours
    }
    const data = await axios.post(`${process.env.REACT_APP_URL||"http://localhost:3010"}/compare`, obj);

    setTables(data.data);
    setFirstBtn(false);
    setSecBtn(false);
  }
  return (
    <>
      <form onSubmit={btHandler}>
        <div className='containar'>
          <div className='containar-one'>
            <p className='title'>
              Leaves File :

            </p>
            <div className='form'>
              <div className='imgandpar'>

                <img className='upimg' src={upload} alt="file" />

                {!firstBtn && <label htmlFor="first" className='clickhere'>Click here to upload excel file</label>
                }
                {firstBtn && <p className='clickhere'>{file1Data.name} Added Successfully</p>}
              </div>
              <label htmlFor="first" className='inptcont'>
                Select a file

                <input className='uploadinpt' onChange={SubmitHandler} disabled={firstBtn} ref={first} id="first" name='first' type="file"
                  accept=".xlsx, .xls, .csv"
                />
              </label>




            </div>
            <div className='formdroplist'>
              {firstBtn && <>
                <p>
                  SheetName:
                </p>
                <select name="drop1" id="drop1" defaultValue={file1Data.arr.length > 1 ? "Final" : "Sheet1"}>

                  {file1Data.arr.map((el, i) => {

                    return <option key={i}

                      value={el}>{el}</option>
                  })}
                </select>
                <p>
                  column of employees names:
                </p>
                <select name="empl1" id="empl1" defaultValue={file1Data.arr.length > 1 ? 1 : 0}>

                  {letter.map((el, i) => {
                    return <option key={i} value={i}>{el}</option>
                  })}
                </select>
                <p>
                  column of compare:
                </p>

                <select name="letter1" id="letter1" defaultValue={6}>
                  {letter.map((el, i) => {
                    return <option key={i} value={i}>{el}</option>
                  })}
                </select>
                <p>start row</p>
                <input className='datalist' list="rowL1" id="row1" name="row1" defaultValue={file1Data.arr.length > 1 ? 3 : 5}
                //  placeholder={file1Data.arr.length > 1 ? 1 : 4}
                >

                </input>
                <datalist id="rowL1" >
                  {file1Data.rowL.map((el, i) => {
                    return <option key={i} value={i + 1}>{i + 1}</option>
                  })}
                </datalist>

                <p>Number of Total Hours </p>
             
                <input  defaultValue="180" required id="numHours" name='numHours'></input>
              



              </>
              }
            </div>
          </div>
          <div className='containar-one'>
            <Header title="Time Sheet File:"/>
            <p className='title'>
              Time Sheet File:

            </p>
            <div className='form' >
              <div className='imgandpar'>

                <img className='upimg' src={upload} alt="file" />

                {!secBtn && <label htmlFor="sec" className='clickhere'>Click here to upload excel file</label>}
                {secBtn && <p className='clickhere'>{file2Data.name} Added Successfully</p>}
              </div>

              <label htmlFor="sec" className='inptcont'>
                Select a file
                <input className='uploadinpt' onChange={SubmitHandler} ref={sec} disabled={secBtn} id="sec" name='sec' type="file"
                  accept=".xlsx, .xls, .csv"
                />

              </label>
            </div>
            <div className='formdroplist'>
              {secBtn && <>
                <p>
                  SheetName:
                </p>
                <select name="drop2" id="drop2" defaultValue={file2Data.arr.length > 1 ? "Final" : "Sheet1"}>
                  {file2Data.arr.map((el, i) => {
                    return <option key={i} value={el}>{el}</option>
                  })}





                </select>
                {/* <p>
                  row of header:
                </p>

                <select name="header2" id="header2" defaultValue={file2Data.arr.length > 1 ? 2 : 4}>
                  {file2Data.rowL.map((el, i) => {
                    return <option key={i} value={i+1}>{i+1}</option>
                  })}
                </select> */}
                <p>
                  column of employees names:
                </p>
                <select name="empl2" id="empl2" defaultValue={file2Data.arr.length > 1 ? 1 : 0}>

                  {letter.map((el, i) => {
                    return <option key={i} value={i}>{el}</option>
                  })}
                </select>
                <p>
                  column of compare:
                </p>
                <select name="letter2" id="letter2" defaultValue={file2Data.arr.length > 1 ? 6 : 6}>
                  {letter.map((el, i) => {
                    return <option key={i} value={i}>{el}</option>
                  })}
                </select>
                <p>start row</p>
                <input className='datalist' list="rowL2" id="row2" name="row2" defaultValue={file2Data.arr.length > 1 ? 3 : 5}
                ></input>
                <datalist id="rowL2" >
                  {numbers.map((el, i) => {
                    return <option key={i} value={i + 1}>{i + 1}</option>
                  })}
                </datalist>

              </>

              }</div>
          </div>
        </div>
        <button disabled={!secBtn || !firstBtn} className='btSubmit'> Compare</button>
      </form>

      {<div className='tables'>
        <section className='tableOne' >
          {tables?.fileOne?.length > 1 && <Table table={tables?.fileOne} />}



          {tables?.fileTwo?.length > 1 && <Table table={tables?.fileTwo} />}


        </section>
        <section className='tabledif' >
          {tables?.fileDif?.length > 1 && <Table table={tables?.fileDif} />}

        </section>
        <section className='tabledif'>
          {tables?.notEqual?.length>1&&<Table table={tables?.notEqual} />}

        </section>
      </div>}

    </>
  );
}

export default App;