import topArroy from '../../aseets/toparow.webp';

const TopToBottom =()=>{

    const gotoBtn =()=>{


window.scrollTo({top:0, left:0, behavior:'smooth'})

    }
    return(
       <div onclick={gotoBtn}>
        <img src = {topArroy} style={{width:"40px", height:"40px"}}></img>
       </div> 
    )
}
export default TopToBottom;