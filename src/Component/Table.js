import React from 'react';
import line from "../img//linetable.png"
import { v4 as uuidv4 } from 'uuid';
function Table(props) {

  return (
    <table className='samenametable'>
      {
        props.table.map((element, i) => {


          return (
            <tbody key={uuidv4()}>

              <tr  className='table' key={uuidv4()} >
                {i === 0 && element.map((el) => {

                  return (
                    
                      <th key={uuidv4()}>{el}</th>
                    
                  )
                })}
                {i !== 0 && element.map((el) => {
                  return (
                    
                      <td key={uuidv4()}>{el}</td>
                   
                  )
                })}

              </tr>

              <img className='line' src={line} />

            </tbody>
          )
        })}

    </table>
    
  );
}

export default Table;