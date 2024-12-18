// import logo from './logo.svg';
// import './App.css';
// import data from "./data.json";
// import { useState } from 'react';

  
  
// function App() {
//   const [up, setup] = useState(0);
//    const [datas,setdatas]=useState(data.rows);
//    const [val,setval]=useState(0);
//    const [curid,setcurid]=useState('');
//    const [varience,setvarience] =useState([]);
//    const handleChange = (value, id) => {
//     setcurid(id);
//     if(curid===id){
//           setval(value);}
          
//   };
//   function calval(id){
//     const i=getIndex(id,datas,"id")
//     let sum=0;
//     for(let j=0;j<datas[i].children.length;j++){
//       sum+=parseInt(datas[i].children[j].value);
//     }
//     return(sum);

//   }
//   function calvar(id){
//     const i=getIndex(id,datas,"id")
//     let sum=0;
//     for(let j=0;j<datas[i].children.length;j++){
//       sum+=parseInt(datas[i].children[j].value);
//     }
//     return(sum);

//   }
//   function getIndex(value, arr, prop) {
//     for(var i = 0; i < arr.length; i++) {
//         if(arr[i][prop] === value) {
//             return i;
//         }
//     }
//     return -1; //to handle the case where the value doesn't exist
// }

//   const adjustByValue=(item_id,child)=>{
//        const i=getIndex(item_id,datas,"id")
//        const child_i=getIndex(child.id,datas[i].children,"id")
//        const oldval=datas[i].children[child_i].value
//        const variance=((oldval-val)/(oldval))*100
//        datas[i].children[child_i].value=val
//        console.log(Math.abs(variance))

//        setup(1);
       
//        return(Math.abs(variance));
     
       
       
      
//   }
//   const adjustBypercentage=(item_id,child)=>{
//     if(val<=100){
//     const i=getIndex(item_id,datas,"id")
//     const child_i=getIndex(child.id,datas[i].children,"id")
   
//     datas[i].children[child_i].value+=((val/100)*datas[i].children[child_i].value)
    
//     console.log(Math.abs(val))
//     setup(1);
    
//     return(Math.abs(val));
   
//     }
   
// }
// function valvar(oldval,newval){
//   const variance=((oldval-newval)/(oldval))*100

//   return(Math.abs(variance));

// }
//   return (
//     <>
//     <table style={{border:"solid"}}>
//     <tr>
//             <th style={{border:"solid"}}>ID</th>
//             <th style={{border:"solid"}}>Value</th>
//             <th style={{border:"solid"}}>Input</th>
//             <th style={{border:"solid"}}>Adjust By Percentage</th>
//             <th style={{border:"solid"}}>Adjust By Value</th>
//             <th style={{border:"solid"}}>Variance</th>             
            
           
            
//            </tr>
//         { datas.map((item) => (
//           <>
//            <tr key={item.id}>
//             <td style={{border:"solid"}}>{item.id}</td>
//             <td style={{border:"solid"}}>{calval(item.id)}</td>
             
            
//             <td style={{border:"solid"}}><input name={item.id} value={val} onChange={(e)=>(handleChange(e.target.value,item.id))}></input></td>
//             <td style={{border:"solid"}}><button>adjust percentage</button></td>
//             <td style={{border:"solid"}}><button>adjust value</button></td>
//             <td style={{border:"solid"}}>In console</td> 
//            </tr>
          
//            {
//             item.children.map((child) => {
//               const child_id=child.id;
//               const item_id =item.id;
//               let varience=0;
//             return (
//               <tr key={child_id}>
//               <td style={{border:"solid"}}>{child.id}</td>
//               <td style={{border:"solid"}}>{child.value}</td>
             
           
//             <td style={{border:"solid"}}><input name={child.id} value={val} onChange={(e)=>(handleChange(e.target.value,item.id))}></input></td>
//             <td style={{border:"solid"}}><button onClick={(varience)=>(varience=adjustBypercentage(item.id,child))}>adjust percentage</button></td>
//             <td style={{border:"solid"}}><button onClick={(varience)=>(varience=adjustByValue(item.id,child))}>adjust value</button></td>
//             <td style={{border:"solid"}}>In console</td>
//            {
//            }

//            </tr>
//             );
            
//           })}
         
//          </>))}
//         </table>

//     </>
//   );
// }

// export default App;
import './App.css';
import initialData from "./data.json";
import { useState, useEffect } from 'react';

  
  
function App() {
  const [rows, setRows] = useState([]);
  const [originalValues, setOriginalValues] = useState({});

  useEffect(() => {
    setRows(initialData.rows);
    setOriginalValues(flattenRows(initialData.rows));
  }, []);

  const flattenRows = (rows, result = {}) => {
    rows.forEach((row) => {
      result[row.id] = row.value;
      if (row.children) flattenRows(row.children, result);
    });
    return result;
  };

  const updateRowValue = (id, newValue, rowsToUpdate) => {
    const updatedRows = rowsToUpdate.map((row) => {
      if (row.id === id) {
        row.value = newValue;
      }
      if (row.children) {
        row.children = updateRowValue(id, newValue, row.children);
        row.value = row.children.reduce((sum, child) => sum + child.value, 0);
      }
      return row;
    });
    return updatedRows;
  };

  const handleUpdate = (id, newValue) => {
    const updatedRows = updateRowValue(id, newValue, rows);
    setRows(updatedRows);
  };

  const calculateGrandTotal = (rows) =>
    rows.reduce((total, row) => total + row.value, 0);

  const Row = ({ row, onUpdate, level = 0 }) => {
    const [inputValue, setInputValue] = useState("");

    const originalValue = originalValues[row.id] || row.value;
    const variance = ((row.value - originalValue) / originalValue) * 100;

    const handleAllocationPercent = () => {
      const percent = parseFloat(inputValue);
      if (!isNaN(percent)) {
        const newValue = row.value + (originalValue * percent) / 100;
        onUpdate(row.id, newValue);
      }
    };

    const handleAllocationValue = () => {
      const value = parseFloat(inputValue);
      if (!isNaN(value)) {
        onUpdate(row.id, value+row.value);
      }
    };

    return (
      <>
        <tr>
          <td style={{ paddingLeft: `${level * 20}px` }}>{row.label}</td>
          <td>{row.value.toFixed(2)}</td>
          <td>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </td>
          <td>
            <button onClick={handleAllocationPercent}>Allocation %</button>
          </td>
          <td>
            <button onClick={handleAllocationValue}>Allocation Val</button>
          </td>
          <td>{variance.toFixed(2)}%</td>
        </tr>
        {row.children &&
          row.children.map((child) => (
            <Row
              key={child.id}
              row={child}
              onUpdate={onUpdate}
              level={level + 1}
            />
          ))}
      </>
    );
  };

  return (
    <div>
      <h1>Hierarchical Table</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.id} row={row} onUpdate={handleUpdate} />
          ))}
          <tr>
            <td>
              <strong>Grand Total</strong>
            </td>
            <td>
              <strong>{calculateGrandTotal(rows).toFixed(2)}</strong>
            </td>
            <td colSpan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


export default App;
