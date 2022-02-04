import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../Actions/DataAction'
import {useEffect} from 'react';

function HomeScreen()
{

  const datavalue=useSelector(state=>state.Data);
  const data=datavalue.Data;
  const loading=datavalue.loading
  const dispatch=useDispatch();

  const inputField=()=>{
    var value=document.getElementById('searchValue').value.toUpperCase()||'';
    dispatch(getData(value))
    
  }
  useEffect(()=>{
    dispatch(getData())
    
    return ()=>{
    };
},[])
    
    return (
      loading ? <div>Loading...</div>:
          <div>
    <div className='background-image' style={{ backgroundImage: 'url("/images/home-page.jpg")' }}>
    <div className='text'>
     <center> <div className='font1'>Let’s find a home that’s perfect for you.℠</div>
     <div className='font2'>Search confidently with your trusted source of homes for sale or rent</div>
     <div className='font2'><a href='#'>BUY</a><a href='#'>RENT</a><a href='#'>SELL</a></div>
     <input type='text' id='searchValue' onInput={()=>inputField()} placeholder=' Address, City, Pincode ' />
     </center>
    </div>
   </div>
   <center><h2>Select your Favourite one</h2></center>
   <b>Total Items :</b> {data.length}
   <div className='grid'>
     
{
  data.length===0 ?<center><div>No Results Found</div></center>:
  data.map(item=>
    <div>
    <div><img src={item.Image} className='images'/></div>
<div><b>Size</b> {item.Size} Sq.ft</div>
<div><b>Bed </b>{item.Beds}</div>
<div><b>Bath </b>{item.Baths}</div>
<div><b>City </b>{item.City}</div>
<div><b>Price Rs </b>{item.Price}</div>
<button className='button'>View More</button>
</div>
  )
  
}
</div>
    </div>
    )
}
export {HomeScreen}