import React from 'react';
import pegi3 from '../../assets/pegi/pegi3.png'
import pegi7 from '../../assets/pegi/pegi7.jpg'
import pegi12 from '../../assets/pegi/pegi12.jpg'
import pegi16 from '../../assets/pegi/pegi16.jpg'
import pegi18 from '../../assets/pegi/pegi18.png'

function PegiAssignation(props){
   
    return (
    <React.Fragment>
        {
            props.pegi === 3?
                <img src={pegi3} alt="Pegi 3" width={50}/>
            :
            props.pegi === 7?
                <img src={pegi7} alt="Pegi 7" width={50}/>
            :
            props.pegi === 12?
                <img src={pegi12} alt="Pegi 12" width={50}/>
            :
            props.pegi === 16?
                <img src={pegi16} alt="Pegi 16" width={50}/>
            :
            props.pegi === 18?
                <img src={pegi18} alt="Pegi 18" width={50}/>
            :
            null
        }
    </React.Fragment>
       
  );
};

export default PegiAssignation;