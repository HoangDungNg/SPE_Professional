import React, { useState } from 'react'
import Card from "../Card/Card";
import { SPE2Questions } from '../../js/list'
import TFCard from '../Card/TFCard';
import IntroCard from '../Card/IntroCard';
// import $ from 'jquery';

const tfQuestions = [
  {question: "Below add a brief description of how you believe you contributed to the project process over the whole semester."},
  {question: "What skills and knowledge do you now know you need to develop for your future work in the IT industry and/or what issues of your own working style do you need to address?"}
]

function SPEOne() {

  const [fsValue, setFsValue] = useState([]);
  const [txtValue, setTxtValue] = useState({txt1: '', txt2: ''});
  // const [fs0Value, setFs0Value] = useState('')
  // const [fs1Value, setFs1Value] = useState('')
  // const [fs2Value, setFs2Value] = useState('')
  // const [fs3Value, setFs3Value] = useState('')
  // const [fs4Value, setFs4Value] = useState('')
  // const [txt1Value, setTxt1Value] = useState('');

  function handleChange(e){

    const {name, value} = e.target
    setFsValue({...fsValue, [name]: value});

    if(name === 'txtarea0') setTxtValue(value);
    if(name === 'txtarea1') setTxtValue(value);
    // console.log(fsValue);

    // console.log('Radio ' + e.target.name + ' selected, with the value of: ' + e.target.value);
    // console.log(e.target)
    // console.log($('fs'))
    // setFsValue(...fsValue, e.target.value);
    // console.log("fsvalue: " + fsValue)
    // $(`#${e.target} input:radio`).on('change', function() {
    //   var value = $(this).val();
    //   console.log(value);
    // });
    // $('#fs0 input:radio').on('change', function() {
    //   var value = $(this).val();
    //   setFs0Value(value)
    //   console.log(fs0Value);
    // });
    // $('#fs0 input:radio').on('change', function() {
    //   var value = $(this).val();
      
      // console.log(txtValue);
    // });
    // $('#fs1 input:radio').on('change', function() {
    //   var value = $(this).val();
    //   setFs1Value(value)
    //   console.log(fs1Value);
    // });
    // $('#fs1 input:radio').on('change', function() {
    //   var value = $(this).val();
    //   setFsValue([{fs1: value}])
    //   console.log(fsValue);
    // });
    // $('#fs2 input:radio').on('change', function() {
    //   var value = $(this).val();
    //   setFs2Value(value)
    //   console.log(fs2Value);
    // });
    // $('#fs3 input:radio').on('change', function() {
    //   var value = $(this).val();
    //   setFs3Value(value)
    //   console.log(fs3Value);
    // });
    // $('#fs4 input:radio').on('change', function() {
    //   var value = $(this).val();
    //   setFs4Value(value)
    //   console.log(fs4Value);
    // });
    // $('#txtarea0').val()
    // console.log($('#txtarea0').val())
    // // {
    //   // var value = $(this).val();
    //   setFsValue([...fsValue,{txt0: e.target.value}])
    //   console.log(fsValue);
    // // });
    // $('#txtarea1').on('change', function() {
    //   var value = $(this).val();
    //   setFsValue([...fsValue,{txt1: value}])
    //   console.log(fsValue);
    // });
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(fsValue);
  }

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
       <div className="flex items-center flex-col p-10 ">
       
          <div className=" p-8 pt-0 flex flex-col items-center border-black-100 border-2">
            
            <IntroCard SPENumber={'2'} />

              <div id="SPEContainer" className="flex flex-col items-center">
                <div id="cards">  
                  <form action="" onSubmit={handleSubmit} className="w-full" method="post" encType="multipart/form-data" id="myForm1">
                    {
                      SPE2Questions.map((question, index) => {
                        return <Card 
                                  question={question.question} 
                                  key={index} 
                                  id={index} 
                                  handleChange={handleChange} 
                                 />                                
                      })                     
                    }

                    {
                      tfQuestions.map((tfquestion, index) => {
                        return <TFCard 
                                  tfquestion={tfquestion.question} 
                                  key={index}
                                  id={index} 
                                  handleChange={handleChange} 
                                  value={txtValue}
                                 /> 
                      })
                    }
                    <button type="submit" className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring">
                      <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <span className="text-sm font-medium transition-all group-hover:mr-4">
                        Submit
                      </span>
                    </button>
                  </form>
                </div>                                      
              </div>
          </div>
        </div> 
    </div>
  )
}

export default SPEOne