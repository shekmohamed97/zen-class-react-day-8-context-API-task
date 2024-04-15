import React,{useContext} from 'react';
import { mycontext } from '../App';


const Cart = () => {
    const[taskData,setTaskData]=useContext(mycontext)

    const totalPrice=taskData.reduce((total, data)=>total + data.price * (data.quantity || 1) , 0)
    
    const totalQuantity=taskData.reduce((total, data)=>total + (data.quantity || 1), 0 );
    
    const handleIncrease=(id, quantity)=>{
            setTaskData(preData=>{
                    return preData.map((item)=>{
                        if(item.id===id){
                              return {...item, quantity:(item.quantity+ 1 || quantity+1)}  
                        }
                        return item
                    })
            })
    }
    const handleDecrease=(id,quantity)=>{
        setTaskData(preTaskData=>{
            return preTaskData.map((item)=>{
                if(item.id===id&&item.quantity||quantity>0){
                      return {...item, quantity:(item.quantity- 1 )}  
                }
                return item
            })
    })         
    }

    const removeCard=(id)=>{
           const cardRemove=taskData.filter(item => item.id !== id);
           setTaskData(cardRemove);
    }
    return (
        <div>
            <h1>product cards</h1>
            <hr />
            <h3 className='total'>toatl Quantity:{totalQuantity}</h3>
            <h3 className='total'>toatl price:{totalPrice}</h3>

            {taskData.map((item, index)=>{
                return(
                    <>
                        <div  key={index}> 
                    
                        {item.images.map((imag,index)=>{
                                return(
                                    <>
                                        <div  key={index}>
                                            <img src={imag} alt='image not found' />
                                        </div>
                                    </>
                                )
                            })}
                    

                            <div className="details">
                            <h2>product Name:{item.title} </h2>
                            <p>Discription:{item.description} </p>
                            <h3>Product Price:{item.price}Rs </h3>
                            <h3>Discount:{item.discountPercentage}%</h3>
                             <h3>Rating:{item.rating}</h3>
                             <h3>Stock:{item.stock}</h3>
                             <h3>Brand:{item.brand}</h3>
                             <h3>Category:{item.category}</h3>   
                            <button className='increase' onClick={()=>handleIncrease(item.id, item.quantity || 1)} > + </button>
                            <button className='decrease' onClick={()=>handleDecrease(item.id, item.quantity || 1)} > - </button>
                            <br />
                            <button className='remove' onClick={()=>removeCard(item.id)}>Remove Card</button>
                            </div>
                        </div>
                        <hr />

                    </>
                )
            })}

        </div>
    );
};

export default Cart;