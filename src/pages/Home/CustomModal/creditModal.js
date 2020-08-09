import React from 'react'
import Modal from '../../../components/Modal'
import Button from "../../../components/Button"
import "./index.scss"
export default function CustomModal(props) {
    const {onClick,info=`You have <span>{creditAmount}</span> rs. credit balanace.`}=props
    return (
        <Modal>
           <div className='credit-modal-wrapper'>
           <div className='credit-balance' dangerouslySetInnerHTML={{__html:info}} /> 
                <div className='button-q-wrapper'>
                    <div className='credit-q'>Do you want to proceed it?</div>
                     <div className='button-wrapper'>
                         <Button onClick={()=>onClick(true)}>
                             <span>Yes</span>
                         </Button>
                         <Button onClick={()=>onClick(false)} theme={{hover:{background:'#960c0c',},background:'#de1616',marginLeft:'12px'}}>
                             <span>No</span>
                         </Button>
                         </div>   
                </div>
           </div>
        </Modal>
    )
}
