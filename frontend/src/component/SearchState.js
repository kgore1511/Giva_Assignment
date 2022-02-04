import axios from 'axios'
import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid'
import {columns} from '../table/tableModel'
function SearchStates() {
    var [states,setStates]=useState([]);
    var [covidData,setCovidData]=useState([]);
    const click=()=> {
        var searchValue=document.getElementById('searchKey').value
        axios.get('/searchState?searchquery='+searchValue).then(res=> {
            document.getElementById('firstDiv').style.display='block'
            document.getElementById('secondDiv').style.display='none'
            setStates(res.data)
        })
    }

    const getDataByState=(state)=> {
        document.getElementById('searchKey').value=state;
        axios.get('/search?searchquery='+state).then(res=> {
            document.getElementById('firstDiv').style.display='none'
            document.getElementById('secondDiv').style.display='block'
            setCovidData(res.data);
        })
    }
    return (
        <div>
            <input type='text'id='searchKey' name='searchKey' placeholder='Search By State or Similiar Syntax'></input>
            <button onClick={()=>click()}>Search</button>
        <div id='firstDiv'>
            {
                states.length==0 ? <div>No Results Found</div> :
                states.map(item=>
                    <button onClick={()=>getDataByState(item.state)}>{item.state}</button>
                    )
            }
        </div>
        <div id='secondDiv'  style={{ height: 400, width: '100%',display:'none' }}>
      <DataGrid
        rows={covidData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
        </div>
    )
}
export default SearchStates;