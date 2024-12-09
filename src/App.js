import logo from './logo.svg';
import './App.css';
import data from "./data.json";
import { useState } from 'react';

  
  
function App() {
  const [up, setup] = useState(0);
   const [datas,setdatas]=useState(data.rows);
   const [val,setval]=useState(0);
   const [curid,setcurid]=useState('');
   const [varience,setvarience] =useState([]);
   const handleChange = (value, id) => {
    setcurid(id);
    if(curid===id){
          setval(value);}
          
  };
  function calval(id){
    const i=getIndex(id,datas,"id")
    let sum=0;
    for(let j=0;j<datas[i].children.length;j++){
      sum+=parseInt(datas[i].children[j].value);
    }
    return(sum);

  }
  function calvar(id){
    const i=getIndex(id,datas,"id")
    let sum=0;
    for(let j=0;j<datas[i].children.length;j++){
      sum+=parseInt(datas[i].children[j].value);
    }
    return(sum);

  }
  function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

  const adjustByValue=(item_id,child)=>{
       const i=getIndex(item_id,datas,"id")
       const child_i=getIndex(child.id,datas[i].children,"id")
       const oldval=datas[i].children[child_i].value
       const variance=((oldval-val)/(oldval))*100
       datas[i].children[child_i].value=val
       console.log(Math.abs(variance))

       setup(1);
       
       return(Math.abs(variance));
     
       
       
      
  }
  const adjustBypercentage=(item_id,child)=>{
    if(val<=100){
    const i=getIndex(item_id,datas,"id")
    const child_i=getIndex(child.id,datas[i].children,"id")
    const oldval=datas[i].children[child_i].value
    datas[i].children[child_i].value+=((val/100)*datas[i].children[child_i].value)
    const variance=((oldval-val)/(oldval))*100
    console.log(Math.abs(variance))
    setup(1);
    
    return(Math.abs(variance));
   
    }
   
}
function valvar(oldval,newval){
  const variance=((oldval-newval)/(oldval))*100

  return(Math.abs(variance));

}
  return (
    <>
    <table style={{border:"solid"}}>
    <tr>
            <th style={{border:"solid"}}>ID</th>
            <th style={{border:"solid"}}>Value</th>
            <th style={{border:"solid"}}>Input</th>
            <th style={{border:"solid"}}>Adjust By Percentage</th>
            <th style={{border:"solid"}}>Adjust By Value</th>
            <th style={{border:"solid"}}>Variance</th>             
            
           
            
           </tr>
        { datas.map((item) => (
          <>
           <tr key={item.id}>
            <td style={{border:"solid"}}>{item.id}</td>
            <td style={{border:"solid"}}>{calval(item.id)}</td>
             
            
            <td style={{border:"solid"}}><input name={item.id} value={val} onChange={(e)=>(handleChange(e.target.value,item.id))}></input></td>
            <td style={{border:"solid"}}><button>adjust percentage</button></td>
            <td style={{border:"solid"}}><button>adjust value</button></td>
            <td style={{border:"solid"}}>In console</td> 
           </tr>
          
           {
            item.children.map((child) => {
              const child_id=child.id;
              const item_id =item.id;
              let varience=0;
            return (
              <tr key={child_id}>
              <td style={{border:"solid"}}>{child.id}</td>
              <td style={{border:"solid"}}>{child.value}</td>
             
           
            <td style={{border:"solid"}}><input name={child.id} value={val} onChange={(e)=>(handleChange(e.target.value,item.id))}></input></td>
            <td style={{border:"solid"}}><button onClick={(varience)=>(varience=adjustBypercentage(item.id,child))}>adjust percentage</button></td>
            <td style={{border:"solid"}}><button onClick={(varience)=>(varience=adjustByValue(item.id,child))}>adjust value</button></td>
            <td style={{border:"solid"}}>In console</td>
           {
           }

           </tr>
            );
            
          })}
         
         </>))}
        </table>

    </>
  );
}

export default App;
